import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';
import * as userService from '../services/userService'
import auth from '../services/authService'
import { divide } from 'lodash';
class RegisterForm extends Form {
  state = {
    data: { username: '', password: '',name: ''},
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
    
  };

  doSubmit = async() => {
    // console.log('Submitted');
    try {
      
      const response = await userService.register(this.state.data)
      console.log('Res',response);
      auth.loginWithJwt(response.headers['x-auth-token'])
      window.location = '/'
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors}
        errors.username = ex.response.data
        this.setState({errors})
      }
      
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className='col s12'>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {/* {this.renderInput('lastname', 'LastName')} */}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
