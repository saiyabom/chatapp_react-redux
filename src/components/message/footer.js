import React,{ Component } from 'react'
import { connect } from 'react-redux';
import {addRoom} from '../../actions'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
class Footer extends Component{

  onSubmit(value){

    console.log(value)
    this.props.addRoom(this.props.socket,'jack',value.roomName);


  }

    render(){
      const { handleSubmit } = this.props;
      if(true){
        return(
          <nav className="navbar fixed-bottom navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Join Room</a>
          <form className="form-inline" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name='roomName' component='input' className="form-control mr-sm-2" type="text" placeholder="Room Name"/>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Join</button>
          </form>
          <div className="dropup">
          <button type="button history-room" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            History Room
          </button>
            <div className="dropdown-menu" aria-labelledby="dropdown10">
              <a className="dropdown-item" href="#">RoomA</a>
              <a className="dropdown-item" href="#">RoomB</a>
              <a className="dropdown-item" href="#">RoomC</a>
            </div>
          </div>
        </nav>
      )
      }

    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ addRoom: addRoom }, dispatch);
}
function mapStateToProps(state){
  return {
    socket:state.message.socket,
  }
}
//function mapStateToProps(state) {
//   return {
//     authenticated: state.auth.authenticated
//   };
// }
// export default connect(mapStateToProps)(Footer);
export default reduxForm({
  form: "AddRoom"
})(connect(mapStateToProps,mapDispatchToProps)(Footer));
