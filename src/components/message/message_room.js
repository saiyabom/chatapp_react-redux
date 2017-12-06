import React, { Component } from 'react'
import _ from 'lodash'
import io from "socket.io-client"

import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {addMessageRoom} from '../../actions'

import MessageItem from './message_item'

import moment from 'moment'


class MessageRoom extends Component{
    constructor(props){
        super(props)
        this.state = { term: "" };
        //console.log('MessageRoom initial in contructor')
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSend = this.handleSend.bind(this)


    }
    componentDidMount(){
      //this.setupSocketIO(this.props.roomName)
    }
    sendMessage(message){
      const {roomName,addMessageRoom} = this.props
      const user='danial'
      const params = {from:user, to:roomName, message,createdAt:moment().format('LT')}

      this.props.message.socket.emit('createMessage', params, function () {
        console.log('createMessage was emited')
        console.log(params)
        addMessageRoom(params.from,params.to,params.message,params.createdAt)
      });

    }
    handleSend(e){
      e.preventDefault()
      console.log('handleSend click')
      this.sendMessage(this.state.term)
      this.setState({ term: "" });
    }
    setupSocketIO(roomName){
      const { addMessageRoom } = this.props
      const { socket } = this.props.message

      console.log(socket)
      // this.props.message.socket.on('newMessage',(response)=>{
      //   const {from, to, message, createdAt} = response
      //   console.log('newMessage was emit: received')
      //   addMessageRoom(from,to,message,createdAt)
      //
      // })


  //     socket.on('disconnect', function () {
  //       console.log('Disconnected from server');
  //     });
  //
  //     socket.on('newMessage', function (message) {
  //       var formattedTime = moment(message.createdAt).format('h:mm a');
  //
  // // var html = Mustache.render(template, {
  // //   text: message.text,
  // //   from: message.from,
  // //   createdAt: formattedTime
  //
  //     });
    }

    renderItems(){

        // const i=[1,2,3,4,5,6,7,8]
        // return _.map(i,x=>{
        //   return <MessageItem key={x} name='Jack Danial' time='13:00' message='Lorem message'/>
        // })
        const { roomName } = this.props
        const messageList = this.props.message[roomName]
        console.log('renderItem: messageList')
        console.log(this.props.message)
        return _.map(messageList, (messageItem,index)=>{
          const {from, to, message,createdAt} = messageItem
          return <MessageItem key={index} name={from} time={createdAt} message={message} />
        })


    }

    scrollToBottom() {
      this.el.scrollTop=this.el.scrollHeight

    }
    onInputChange(event) {
      this.setState({ term: event.target.value });
    }

    render(){
        return(

            <div className="col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-comment">{this.props.roomName}</span>

                    </div>
                    <div className="panel-body" >
                        <ul className="chat" ref={el =>{ this.el=el; }}>
                            {this.renderItems()}
                        </ul>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <input value={this.state.term}
                            id="btn-input" type="text"
                            className="form-control input-sm"
                            onChange={this.onInputChange}
                            placeholder="Type your message here..." />

                            <span className="input-group-btn">
                                <button className="btn btn-warning btn-sm" id="btn-chat" onClick={this.handleSend}>
                                    Send</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
function mapStateToProps(state){
  return{
    message: state.message
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ addMessageRoom: addMessageRoom }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(MessageRoom);
