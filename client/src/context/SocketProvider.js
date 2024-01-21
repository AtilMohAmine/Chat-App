import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
        autoConnect: false,
        auth: {
          token: '',
          userName: ''
        }
      })

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext
