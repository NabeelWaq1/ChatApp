import { useState } from "react"
import GenderCheckBox from "./GenderCheckBox.jsx"
import { BiLoaderCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import useSignUp from "../../Hooks/useSignUp.js";


const SignUp = () => {

    const { signup, loading } = useSignUp();

    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confPassword: '',
        gender: '',
    })

    const handleChangeCheckbox = (gender) => {
        setInputs({...inputs, gender });
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    await signup(inputs);
    console.log('inputs',inputs);
    
  }

  return (
    <div className="flex flex-col justify-center items-center w-96 mx-auto">
        <div className="w-full bg-gray-400 bg-opacity-0 backdrop-filter backdrop-blur-md rounded-lg p-6 shadow-md bg-clip-padding" data-theme={'dark'}>
            <h1 className="text-3xl font-semibold text-gray-300 text-center">Sign Up <span className="text-blue-500">ChatApp</span></h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="fullname" className="label p-2">
                        <span className="label-text text-base">Full Name</span>
                    </label>
                    <input type="text" placeholder="Nabeel Waqas"  id="fullname" className="input input-bordered w-full h-10" value={inputs.fullname} onChange={(e)=>setInputs({...inputs,fullname:e.target.value})} />
                </div>
                <div>
                    <label htmlFor="username" className="label p-2">
                        <span className="label-text text-base">Username</span>
                    </label>
                    <input type="text" placeholder="nabeelwaq"  id="username" className="input input-bordered w-full h-10" value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} />
                </div>
                <div>
                    <label htmlFor="password" className="label p-2">
                        <span className="label-text text-base">Password</span>
                    </label>
                    <input type="password" placeholder="******"  id="password" className="input input-bordered w-full h-10" value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="confPassword" className="label p-2">
                        <span className="label-text text-base">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="******"  id="confPassword" className="input input-bordered w-full h-10" value={inputs.confPassword} onChange={(e)=>setInputs({...inputs,confPassword:e.target.value})}/>
                </div>
                <GenderCheckBox handleChangeCheckbox={handleChangeCheckbox} checkboxValue={inputs.gender} />
                <Link to={'/login'} className="text-sm inline-block hover:underline hover:text-blue-500 mt-2">Already have an account?</Link>
            <button onClick={handleSignUp} type="submit" className="btn btn-block btn-sm mt-2" disabled={loading}>{loading ? <BiLoaderCircle className="animate-spin" size={28} /> : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp


