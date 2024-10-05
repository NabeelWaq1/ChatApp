import { Link } from "react-router-dom"
import { useState } from 'react'
import useLogin from "../../Hooks/useLogin.js";
import { BiLoader } from 'react-icons/bi'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading, login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login({username,password});
    }
  return (
     <div className="flex flex-col justify-center items-center w-96 mx-auto">
        <div className="w-full p-6 shadow-md bg-gray-400 backdrop-filter backdrop-blur-md bg-clip-padding rounded-lg bg-opacity-0" data-theme={'dark'}>
            <h1 className="text-3xl font-semibold text-center text-gray-300">Login <span className="text-blue-500">ChatApp</span></h1>

            <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="username" className="label p-2">
                <span className="label-text text-base">Username</span>
            </label>
            <input type="text" placeholder="Enter Username" id="username" name="username" className="input w-full input-bordered h-10" value={username} onChange={(e)=> setUsername(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="password" className="label p-2">
                <span className="label-text text-base">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" id="password" name="username" className="input w-full input-bordered h-10" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            <Link to={'/signup'} className="text-sm inline-block hover:underline hover:text-blue-500 mt-2">{"Don't"} have an account?</Link>
            <button disabled={loading} type={'submit'} onClick={handleLogin} className="btn btn-block btn-sm mt-2">{loading ? <BiLoader /> : 'Login'}</button>
        </form>
        </div>
     </div>
  )
}

export default Login