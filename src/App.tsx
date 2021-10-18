import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from "./components/header";
import Home from './pages/home';

class App extends PureComponent {
  render() {
    return (
      <div className="container-fluid px-0">
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;