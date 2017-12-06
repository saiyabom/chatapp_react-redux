import{ ADD_ROOM, SETUP_SOCKET, ADD_ROOM_MESSAGE} from '../actions/types'
import _ from 'lodash'

export default function(state={},action){
  switch(action.type){
    case ADD_ROOM:
    console.log('====reducer====')

      let {roomLists} = state
      if(!roomLists) roomLists=[]
      roomLists.push(action.payload)
      return {
        ...state,
        roomLists,
        [action.payload]:[]
      }

    case SETUP_SOCKET:

      return{
        ...state,
        socket:action.payload
      }
    case ADD_ROOM_MESSAGE:
      console.log('=======ADD_ROOM_MESSAGE reducer=====')
      const {to} = action.payload

      let listMessages = state[to]
      if(listMessages) listMessages.push(action.payload)
      console.log(listMessages)
      return {
        ...state,
        [action.payload.to]: listMessages
      }
    default:
      return state;
  }
}
