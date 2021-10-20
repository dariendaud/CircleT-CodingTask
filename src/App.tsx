import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import Home from './pages/home';
import Details from './pages/details';

class App extends PureComponent {
  render() {
    return (
      <div className="container-fluid px-0">
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path="/details" component={Details}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;