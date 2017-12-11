
//Message Section
//Child Component is
//MessageRoom(roomName, )
//MessageItem(from,to,message,time)
import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MessageRoom from './message_room'
import MessageRoomTest from './message_room_test'
import { setupSocket ,addMessageRoom} from '../../actions'

import _ from 'lodash'


import Footer from './footer'

class MessageSection extends Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    // const socket = SocketIO('http://localhost:3090');
    //console.log(socket)

    const { setupSocket, addMessageRoom} = this.props

    setupSocket();
  }

  renderRoomLists(roomList){
    console.log('RenderList execute')
    return _.map(roomList,(roomName)=>{
      console.log(roomName)
      return <MessageRoom key={roomName} roomName={roomName} />
    })
  }

  render(){

    return(
      <div>
        <div className='row'>
        {this.renderRoomLists(this.props.message.roomLists)}
        </div>
       <Footer />
      </div>

    )
  }
}
function mapStateToProps(state){
  return{
    message: state.message,
  }
}
function mapDispatchToProps(dispatch) {

  return bindActionCreators({ setupSocket, addMessageRoom }, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(MessageSection);
