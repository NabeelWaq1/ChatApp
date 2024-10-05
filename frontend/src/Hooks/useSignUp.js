import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx"; // Correct casing


const useSignUp = () => {
 const [loading, setLoading] = useState(false);
 const { setAuthUser } = useAuthContext();

 const signup = async ({fullname, username,  gender, password, confPassword}) => {
       const success = handleCheckErrors({fullname, username,  gender, password, confPassword});
       if(!success) return;

       setLoading(true);

       try {
        const res = await fetch('/api/auth/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fullname, username,  gender, password, confPassword}),
        })
        const data = await res.json();


        if(!data.success){ 
            return toast.error(data.message);
        }

        localStorage.setItem('chat-user',JSON.stringify(data.newUser));
        setAuthUser(data.newUser);
        
        toast.success('Signed Up Successfully');
       } catch (error) {
        console.log(error.message);
        toast.error(error.message);
       } finally{
        setLoading(false);
       }
 }

 

 return { loading , signup };


}

export default useSignUp

const handleCheckErrors = ({fullname, username,  gender, password, confPassword}) => {
    // Check if all fields are filled
    if (!fullname ||!username ||!gender ||!password ||!confPassword) {
        toast.error('Please fill in all fields')
        return false;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return false;
    }

    // Check if passwords match
    if (password!== confPassword) {
        toast.error('Passwords do not match')
        return false;
    }

    // If all checks pass, return true
    return true;
}