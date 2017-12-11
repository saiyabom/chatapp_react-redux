
import {SETUP_SOCKET, ADD_ROOM, ADD_ROOM_MESSAGE} from './types';
import generateMessage from '../utils/generateMessage'
import SocketIO from "socket.io-client"

export function setupSocket(){
  return function(dispatch){
    console.log('======actions=======')
    const socket = SocketIO('http://localhost:3090',{
      query: 'token=' + localStorage.getItem('token')
    });
    socket.on('connect',()=>{
      //console.log('io')
      socket.on('newMessage',(response)=>{
        const {from, to, message, createdAt} = response
        console.log('newMessage was emit: received')
        const payload = {...response, isSender:false}
        dispatch({
          type: ADD_ROOM_MESSAGE,
          payload
        })

        //callback(from,to,message,createdAt)

      })
      console.log('connect')
    })


    dispatch({
      type: SETUP_SOCKET,
      payload: socket
    })
  }

}

export function addRoom(socket,from,roomName){
  console.log('======actions=======')
  let params = {
    from:'jack',
    to: roomName,
  }
  socket.emit('join', params, function (err) {
    console.log('join')
    console.log(roomName)
    if (err) {
      alert(err);
    } else {
      console.log('No error');
    }
  });
  console.log('ADDROOM')
  return{
    type: ADD_ROOM,
    payload: roomName
  }
}

// MessageItems actions
export function addMessageRoom(from,to,message,createdAt,isSender){
  console.log('=====Action====')

  const params = generateMessage(from,to,message,createdAt)

  // socket.emit('createMessage', params, function () {
  //   console.log('createMessage was emited')
  // });
  const payload = {...params, isSender}
  console.log(payload)
  return {
    type: ADD_ROOM_MESSAGE,
    payload
  }
}
