import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import {Signin,Signup, RequireAuth} from './auth'
import {MessageSection} from './message'
//import MessageSection from './message/message_section'

// export default class App extends Component {
//   render() {
//     return (
//       <div className='container'>
//         <MessageSection />
//       </div>
//     );
//   }
// }

export default class App extends Component{
  render(){
    return(
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Signin}/>
          <Route path='/singin' component={Signin}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/message' component={RequireAuth(MessageSection)} />
        </Switch>
      </div>
    )
  }
}
