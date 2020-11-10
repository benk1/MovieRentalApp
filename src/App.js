import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import Movies from './components/Movies';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogOut from './components/LogOut';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <>
        <ToastContainer />

        <NavBar user={this.state.user} />
        <div className=' container  '>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={LogOut} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='movies' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
