import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import './App.css';
import Typing from './components/Typing';
import Sidebar from './components/Sidebar';

const socket = io('http://localhost:5000');

const App = () => {  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [typingUser, setTypingUser] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesContainerRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    messageInputRef.current.addEventListener('keypress', (e) => {
      socket.emit('activity', socket.id);
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      if(messages.length > 0) {
        const lastMessageGroup = [...messages[messages.length - 1]]
        if(lastMessageGroup[lastMessageGroup.length - 1].user === message.user) {
          lastMessageGroup.push(message)
          setMessages([...messages.slice(0, -1), lastMessageGroup])
        } else {
          setMessages([...messages, [message]])
        }
      } else {
        setMessages([[message]])
      }
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    });
  }, [messages]);

  useEffect(() => {
    socket.on('activity', (user) => {
      setTypingUser(user)
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(setTimeout(() => setTypingUser(''), 3000));
    });
  }, [typingTimeout]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(inputMessage) {
        socket.emit('message', { user: socket.id, message: inputMessage });
        setInputMessage('');
      }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen"> 
      <div id="messages" ref={messagesContainerRef} className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      { 
        messages.map((messageGroup, index) => 
          <div key={index} className="chat-message">
            { messageGroup[0].user === 'server'
              ? (<div className='flex items-end justify-center'>
                  <div className='flex flex-col space-y-2 text-xs max-w-xs items-center'>
                    {
                      messageGroup.map((message, messageIndex) => 
                        <div key={messageIndex}><span className='px-4 py-2 inline-block text-gray-600'>{message.message}</span></div>
                      )
                    }
                  </div>
                </div>)
              : (<div className={`flex items-end ${messageGroup[0].user === socket.id && 'justify-end' }`}>
              <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 ${messageGroup[0].user === socket.id ? 'items-end' : 'items-start'}`}>
                  {
                    messageGroup.map((message, messageIndex) => {
                    
                    const format = new Date(message.time).getDate() === new Date().getDate() 
                      ?
                        {
                          hour: 'numeric',
                          minute: 'numeric'
                        }
                      :
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        }
                    const formattedTime = new Intl.DateTimeFormat('default', format).format(new Date(message.time));

                    const previousMessage = messageIndex > 0 ? messageGroup[messageIndex - 1] : null;
                    const showTime = message.user !== 'server' && (messageIndex === 0 || (previousMessage && new Date(message.time).getMinutes() !== new Date(previousMessage.time).getMinutes()));
                      
                    return (
                      <div key={messageIndex} className={`flex flex-col ${messageGroup[0].user === socket.id ? 'items-end' : 'items-start'}`}>
                        { showTime && <span className="text-gray-500 text-xxs mx-2 italic">{ formattedTime }</span> }
                        <span className={`px-4 py-2 rounded-lg inline-block ${message.user === socket.id ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} ${messageIndex === messageGroup.length - 1 && ( message.user === socket.id ? 'rounded-br-none' : 'rounded-bl-none' )}`}>{message.message}</span>
                      </div>
                      )
                    })
                  }
              </div>
              <img src="./default_profile.png" alt="My profile" className={`w-6 h-6 rounded-full ${messageGroup[0].user === socket.id ? 'order-2' : 'order-1'}`} />
            </div>)
            }
          </div>
      )}
      <span className="flex items-center justify-center">
        {typingUser !== '' && (
          <>
            <span>{typingUser} is typing</span>
            <Typing />
          </>
        )}
      </span>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          
            <input type="text" ref={messageInputRef} value={inputMessage} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3" onChange={(e) => setInputMessage(e.target.value)} />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
              </button>
              <button type="submit" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
              </button>
            </div>
        </div>
      </div>
      </form>
      </div>
    </div>
)

}

export default App;
