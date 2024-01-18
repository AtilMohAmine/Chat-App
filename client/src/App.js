import './App.css';
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Chat from './components/Chat';
import Register from './components/Register';

const App = () => {  
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Chat />} />

        <Route path="register" element={<Register />} />

      </Route>
    </Routes>
  )

}

export default App;
