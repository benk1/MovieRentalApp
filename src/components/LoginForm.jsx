import React, { Component } from 'react';
import Joi from 'joi-browser';
//import Input from './common/Input';
import Form from './common/Form';
import auth from '../services/authService'
import {Redirect} from 'react-router-dom'

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async() => {
    //console.log('Submitted');
  try {
    
    const{data} = this.state
     await auth.login(data.username,data.password)

     const {state} = this.props.location
    window.location = state ? state.from.pathname : '/'
  } catch (ex) {
    if(ex.response && ex.response.status === 400){
      const errors = {...this.state.errors} // clone the errors object from the state
      errors.username = ex.response.data //this will display error from the server
      this.setState({errors}) // set the errors ES6--keys == values
    }
    
  }
  };
  render() {
    if(auth.getCurrentUser()) return <Redirect to='/' />
    return (
      <div className='row'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className='col s12'>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}

          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
