import axios from "../api/axios";
import useAuth from "./useAuth";
import useSocket from "./useSocket";

const useLogout = () => {
    const { setAuth } = useAuth()
    const socket = useSocket()

    const logout = async () => {
        try {
            await axios.get('/logout', {
                withCredentials: true
            })
            socket.disconnect()
            setAuth({})
        } catch (err) {
            console.error(err)
        }
    }

    return logout
}

export default useLogout