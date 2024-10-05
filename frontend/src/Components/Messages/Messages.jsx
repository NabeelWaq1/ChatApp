import { useEffect, useRef } from "react";
import useGetMessages from "../../Hooks/useGetMessages.js"
import MessageSkeleton from "../../Skeletons/MessageSkeleton.jsx";
import Message from "./Message.jsx"
import UseListenMessages from "../../Hooks/UseListenMessages.js";


const Messages = () => {
  const { loading, messages } = useGetMessages();
  UseListenMessages();
  const lastMsgRef = useRef();


  useEffect(() => {
		setTimeout(() => {
			lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 scrollbar py-7">

{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMsgRef}>
						<Message message={message} />
					</div>
				))}


      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messages