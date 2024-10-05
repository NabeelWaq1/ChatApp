import MessageContainer from "../../Components/Messages/MessageContainer.jsx"
import SideBar from "../../Components/SideBar/SideBar.jsx"


const Home = () => {
  return (
    <div className="flex bg-gray-400 bg-opacity-0 backdrop-filter backdrop-blur-md rounded-lg sm:h-[450px] md:h-[550px] overflow-hidden bg-clip-padding">
        <SideBar />
        <MessageContainer />
    </div>
  )
}

export default Home