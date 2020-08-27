import React, { Component } from 'react';
import Joi from 'joi-browser';
//import Input from './common/Input';
import Form from './common/Form';
class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => {
    console.log('Submitted');
  };
  render() {
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
