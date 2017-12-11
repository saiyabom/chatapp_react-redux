import React, { Component } from 'react';
import { reduxForm,Field} from 'redux-form';
import { signupUser} from '../../actions';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!

    console.log('handleFormSubmit')
    console.log(formProps)

    const {email,password,passwordConfirm} = formProps
    if(password==passwordConfirm) this.props.signupUser({email,password})
    //this.props.signupUser(formProps);
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;


    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name='email' component='input' className="form-control" {...email} />

        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name='password' component='input' className="form-control" {...password} type="password" />

        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field name='passwordConfirm' component='input' className="form-control" {...passwordConfirm} type="password" />

        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({signupUser:signupUser},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  fields: ['email', 'password','passwordConfirm']
})(Signup));
// export default reduxForm({
//   form: 'signup',
//   fields: ['email', 'password', 'passwordConfirm'],
//   validate
// }, mapStateToProps, actions)(Signup);
