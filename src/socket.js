import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";
let socket;

export function getSocket(store){
    if (!socket){
        socket = io.connect();

        socket.on('onlineUsers', data =>{
            store.dispatch(
                onlineUsers(data.onlineUsers)
            );   
        });
        socket.on('userJoined', data =>{
            store.dispatch(
                userJoined(data.onlineUser)
            ); 
            console.log('data onlineUsers in socket.js user joined: ', data)
        });
        socket.on('userLeft', data =>{
            store.dispatch(
                userLeft(data)
            );
        });
    }

    return socket;
}