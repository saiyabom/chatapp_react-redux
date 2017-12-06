import React, { Component } from 'react';
import MessageSection from './message/message_section'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <MessageSection />
      </div>
    );
  }
}
