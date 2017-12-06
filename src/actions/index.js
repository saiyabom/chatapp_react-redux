
import {SETUP_SOCKET, ADD_ROOM, ADD_ROOM_MESSAGE} from './types';
import generateMessage from '../utils/generateMessage'

export function setupSocket(socket){
  console.log('======actions=======')
  
  return {
    type: SETUP_SOCKET,
    payload: socket
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
export function addMessageRoom(from,to,message,createdAt){
  console.log('=====Action====')

  const params = generateMessage(from,to,message,createdAt)
  console.log(params)
  // socket.emit('createMessage', params, function () {
  //   console.log('createMessage was emited')
  // });
  return {
    type: ADD_ROOM_MESSAGE,
    payload:  params
  }
}
