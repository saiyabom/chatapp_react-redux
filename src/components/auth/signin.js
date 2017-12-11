import React, { Component } from 'react';
import { reduxForm,Field} from 'redux-form';
import {signinUser} from '../../actions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;


    return (
      <form className='form-signin' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <fieldset className="form-group">
          <label className="sr-only">Email address</label>
          <Field {...email} name='email' component='input' className="form-control" type='email' placeholder='Email' />
        </fieldset>
        <fieldset className="form-group">
          <label className="sr-only">Password</label>
          <Field {...password} name='password' component='input' type="password" className="form-control" type="password" placeholder="Password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
        <Link to="/signup"><button className='btn btn-lg btn-secondary btn-block'>Sign up</button></Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps')
  return { errorMessage: state.auth.error };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({signinUser:signinUser},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin));
