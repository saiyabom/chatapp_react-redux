import React,{ Component } from 'react'

export default class MessageItem extends Component{
    constructor(props){
        super(props)
        this.name = "jack sparow"
        this.time = "12 minutes ago"
        this.message = 'Lorem na jaaa'
    }
    render(){
      const firstChar = this.props.name.charAt(0)
      const placehold = 'http://placehold.it/50/55C1E7/fff&text='+firstChar
        return(
            <li className="left clearfix">
                <span className="chat-img float-left">
                    <img src={placehold} alt="User Avatar" className="img-circle" />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{this.props.name}</strong> <small className="float-right text-muted">
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
