import express from "express";
import { Server } from 'socket.io'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = new Server(server, { cors: { origin: ['http://localhost:3000'], methods:['POST','GET'] } });

export const getRecieverId = (recieverId) => {
    return socketMap[recieverId] || null;
}

const socketMap = {};
io.on('connection',(socket) => {

    const userId = socket.handshake.query.userId;

    if(userId !== undefined) socketMap[userId] = socket;
    io.emit('getOnlineUsers',Object.keys(socketMap))

    socket.on('disconnect',()=>{

        delete socketMap[userId];
        io.emit('getOnlineUsers',Object.keys(socketMap))
    })
})

export {app, io , server};