import { BiLoader, BiLogOut } from 'react-icons/bi'
import useLogout from '../../Hooks/useLogout.js'
 
const LogOutButton = () => {
  const {logout, loading} = useLogout();
  return (
    <div className="mt-auto">
    {
      loading ? <BiLoader size={28} className='animate-spin duration-500' /> :(<BiLogOut onClick={logout} className='w-6 h-6 text-white cursor-pointer' />)
    }
    </div>
  )
}

export default LogOutButton