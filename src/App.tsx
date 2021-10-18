import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;