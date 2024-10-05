import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const useLogin = () => {
 
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const login = async ({username,password}) => {
        const success = handleCheckErrors({username, password});
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                }
            )
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            localStorage.setItem('chat-user',JSON.stringify(data.user));
            setAuthUser(data.user);
            toast.success('Logged In Successfully')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }

    }
    return { loading, login }

}

export default useLogin



const handleCheckErrors = ({username, password}) => {
    // Check if all fields are filled
    if (!username ||!password) {
        toast.error('Please fill in all fields')
        return false;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return false;
    }

    // If all checks pass, return true
    return true;
}