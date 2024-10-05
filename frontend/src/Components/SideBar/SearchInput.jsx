import { IoSearchSharp } from 'react-icons/io5'
import { useConversations } from '../../Zustand/useConversations.js'
import useGetConversations from '../../Hooks/useGetConversations.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const { setSelectedConversation } = useConversations();
  const {conversations} = useGetConversations();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault();
    if(!searchTerm){
      return
    }
    if(searchTerm.length < 3){
      return toast.error('Search term should be at least 3 characters long');
        // stop function execution if search term is too short
    }

    const filteredConversations = conversations.filter(c => c.username.toLowerCase().includes(searchTerm));
    if(filteredConversations){
      setSelectedConversation(filteredConversations[0]);
    setSearchTerm('')
    }else{
      return toast.error('No conversation found with that username');
    }
    
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full" data-theme='dark' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />

        <button onClick={handleSearch} type="submit" className="bg-blue-500 text-white btn-circle btn" data-theme='dark'><IoSearchSharp className='w-6 h-6 outline-none' /></button>
    </form>
  )
}

export default SearchInput