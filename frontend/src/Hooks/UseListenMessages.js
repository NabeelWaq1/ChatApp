import { useEffect } from "react";
import { useSocketContext } from "../Context/socketContext";
import { useConversations } from "../Zustand/useConversations";
import messageRingtone from '../assets/ringtone.mp3'

const UseListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversations();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {

            setMessages([...messages, newMessage]);
            newMessage.shouldShake = true;
            const audio = new Audio(messageRingtone);
            audio.play();
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.off("newMessage", handleNewMessage);
            }
        };
    }, [socket, setMessages,messages]);

    // return null; // Or return any necessary component
};

export default UseListenMessages;
