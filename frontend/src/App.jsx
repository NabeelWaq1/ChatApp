import Home from "./Pages/Home/Home.jsx"
import Login from "./Pages/Login/Login.jsx"
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp.jsx"
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./Context/AuthContext.jsx"; // Correct casing


function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <Routes> 

     	<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />

       </Routes> 
      <Toaster />
    </div>
  )
}

export default App
