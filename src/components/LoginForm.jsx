import React, { Component } from 'react';
import Input from './common/Input';
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
  };
  validate = () => {
    const errors = {};
    const { username, password } = this.state;
    if (username.trim() === '') errors.username = 'Username is required!';
    if (password.trim() === '') errors.password = 'Password is required!';
    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({
      errors: errors || {},
    });
    if (errors) return;
    //call the server
    console.log('Submitted');
    this.setState({
      username: '',
      password: '',
    });
  };
  validateProperty = (input) => {
    if (input.name === 'username') {
      if (input.value.trim() === '') return 'Username is required';
    }

    if (input.name === 'password') {
      if (input.value.trim() === '') return 'Password is required';
    }
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];

    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors,
    });
  };
  render() {
    const { username, password, errors } = this.state;
    return (
      <div className='row'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className='col s12'>
          <Input
            name='username'
            value={username}
            label='Username'
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            name='password'
            value={password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className='waves-effect waves-light btn-large blue darken-2 '>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
