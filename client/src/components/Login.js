import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const Login = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
              
            const response = await axios.post('/auth',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken
            
            setAuth({user, pwd, accessToken})
            navigate('/')
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if(err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if(err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        } 
    }

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center mx-auto">
            Login
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
            <div>
                <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200">Username</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
            </div>

            <div className="mt-4">
                <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
            </div>

            <div className="mt-6">
                <button disabled={!user || !pwd ? true : false} className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Sign In
                </button>
            </div>
            <div className="mt-2">
            <p ref={errRef} className={errMsg ? "text-xs bg-slate-200 text-red-600 rounded-md p-1" : "hidden"} aria-live="assertive">{errMsg}</p>
            </div>
            
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <a href="/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Create One</a></p>
    </div>
  )
}

export default Login