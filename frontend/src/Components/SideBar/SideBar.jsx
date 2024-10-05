import Conversations from './Conversations.jsx'
import LogOutButton from './LogOutButton.jsx'
import SearchInput from './SearchInput.jsx'


const SideBar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-2'></div>
        <Conversations />
        <LogOutButton />
    </div>
  )
}

export default SideBar