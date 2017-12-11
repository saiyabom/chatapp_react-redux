import React,{ Component } from 'react'

export default class MessageItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
      const firstChar = this.props.name.charAt(0)
      const placehold = 'http://placehold.it/50/55C1E7/fff&text='+firstChar
      const {isSender} = this.props
      console.log('isSender:', isSender)
        return(
            <li className={isSender?"right clearfix":"left clearfix"}>
                <span className={isSender?"chat-img float-right":"chat-img float-left"}>
                    <img src={placehold} alt="User Avatar" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{this.props.name}</strong> <small className={isSender?"float-left text-muted":"float-right text-muted"}>
                            <span className="glyphicon glyphicon-time"></span>{this.props.time}</small>
                    </div>
                    <p>
                        {this.props.message}
                    </p>
                </div>
            </li>
        )
    }
}
