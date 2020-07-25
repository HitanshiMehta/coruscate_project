import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { route } from './common/AppConfig'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Welcome from './components/Index/Welcome'
import Menu from './components/Index/Menu'
import Home from './components/User/Home'
import LoginIndex from './components/User/LoginIndex'
import UserForm from './components/Puzzle/UserForm'
import ThemeContextProvider from './context/ThemeContext';


function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Route path={route.welcome} component={Welcome} />
        <Route path={route.menu} component={Menu} />
        <Route path={route.home} component={Home} />
        <Route path={route.loginIndex} component={LoginIndex} />
        <Route path={route.userForm} component={UserForm} />
        <Redirect to={route.welcome} />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
