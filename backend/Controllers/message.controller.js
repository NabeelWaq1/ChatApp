import Conversation from '../Models/conversationModel.js'
import Message from '../Models/messageModel.js'
import { getRecieverId, io } from '../Socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id:recieverId } = req.params;
        const senderId = req.user._id;

        if(!senderId){
            return res.status(400).json({
                error: true,
                message: 'You must be loggged in to send a message',
            })
        }

        if(senderId.toString() === recieverId.toString()){
            return res.status(400).json({
                error: true,
                message: 'Cannot send message to yourself',
            })
        }


        if(!message){
            return res.status(400).json({
                error: true,
                message: 'Message is required',
            })
        }

        let conversation = await Conversation.findOne({
            participants: { $all : [recieverId, senderId]}
        })

        if(!conversation){
          conversation = await Conversation.create({
                participants:[senderId, recieverId],
            })
        }

        const newMessge = new Message({
            senderId,
            recieverId,
            message
        })

        if(newMessge){
            conversation.messages.push(newMessge);
        }
        await Promise.all([conversation.save(), newMessge.save()]);

        const recieverSocketId = getRecieverId(recieverId);
        
        if(recieverSocketId){
            io.to(recieverSocketId.id).emit('newMessage',newMessge)
        }
        

        return res.status(201).json(newMessge);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:otherUserId } = req.params;
        const userId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all : [otherUserId, userId]}
        }).populate("messages");
        if (!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        return res.json(messages);
    } catch (error) {
        console.log(error.message);
        return res.status(500).status({error: true, message: error.message});
    }
}