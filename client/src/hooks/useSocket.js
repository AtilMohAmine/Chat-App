import { useContext } from "react"
import SocketContext from "../context/SocketProvider"

const useSocket = () => {
    return useContext(SocketContext)
}

export default useSocket