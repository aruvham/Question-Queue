import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const LoginComponent = props => (
  props.loggedIn ? <Redirect to='/home' /> :
  (
  <MuiThemeProvider>
    <div id='login-wrapper'>
      <div className='login-content'>
        <div id='login-background'></div>
        <h1 className='welcomeText'>Log in with your github account</h1>
        <div className='login-github-logo'></div>
        <FlatButton
            id='login-button'
            href='/auth/github'
            label='Login'
        />
      </div>
    </div>
  </MuiThemeProvider>
  )
);
export default LoginComponent;
