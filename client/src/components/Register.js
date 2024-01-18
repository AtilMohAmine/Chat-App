import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus]= useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const options = {
                url: 'http://localhost:5000/register',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                  user,
                  pwd
                }
            };
              
            await axios(options)
            navigate('/')
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if(err.response?.status === 409) {
                setErrMsg('User Name Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
            console.log(err.response)
        }
    }

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center mx-auto">
            Register
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
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
                <p id="uidnote" className={userFocus && user && !validName ? "text-xs bg-slate-200 text-black rounded-md p-1" : "hidden"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>

            <div className="mt-4">
                <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "text-xs bg-slate-200 text-black rounded-md p-1" : "hidden"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
            </div>

            <div className="mt-4">
                <label htmlFor="confirm_pwd" className="block text-sm text-gray-800 dark:text-gray-200">Confirm Password</label>
                <input 
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "text-xs bg-slate-200 text-black rounded-md p-1" : "hidden"}>
                    Must match the first password input field.
                </p>
            </div>

            <div className="mt-6">
                <button disabled={!validName || !validPwd || !validMatch ? true : false} className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Sign Up
                </button>
            </div>
            <div className="mt-2">
            <p ref={errRef} className={errMsg ? "text-xs bg-slate-200 text-red-600 rounded-md p-1" : "hidden"} aria-live="assertive">{errMsg}</p>
            </div>
            
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400"> Already have an account? <a href="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Sign in</a></p>
    </div>
  )
}

export default Register