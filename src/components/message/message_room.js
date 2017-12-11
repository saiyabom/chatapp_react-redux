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
    sendMessage(user,message){
      const {roomName,addMessageRoom} = this.props
      const params = {from:user, to:roomName, message,createdAt:moment().format('LT')}

      this.props.message.socket.emit('createMessage', params, function () {
        console.log('createMessage was emited')
        console.log(params)
        addMessageRoom(params.from,params.to,params.message,params.createdAt,true)
      });

    }
    handleSend(e){
      e.preventDefault()
      console.log('handleSend click')
      this.sendMessage(this.props.email,this.state.term)
      this.setState({ term: "" });
    }
    setupSocketIO(roomName){
      const { addMessageRoom } = this.props
      const { socket } = this.props.message

      console.log(socket)
    }

    renderItems(){
        const { roomName, email } = this.props
        const messageList = this.props.message[roomName]
        console.log('renderItem: messageList')
        console.log(this.props.message)
        return _.map(messageList, (messageItem,index)=>{
          const {from, to, message,createdAt} = messageItem
          const isSender = (email===from)
          console.log('Email:',email)
          console.log('from:',from)
          console.log('isSender', isSender);

          return <MessageItem key={index} name={from} time={createdAt} message={message} isSender={isSender}/>
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
    message: state.message,
    email: state.auth.email
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ addMessageRoom: addMessageRoom }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(MessageRoom);
