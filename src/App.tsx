import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import Store from "./redux/Store";
import Header from "./components/Header";
import Home from './pages/home';
import Details from './pages/details';

class App extends PureComponent {
  render() {
    return (
      <div className="container-fluid px-0">
        <Provider store={Store}>
          <Header />

          <BrowserRouter>
            <Switch>
              <Route path="/details" component={Details}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;