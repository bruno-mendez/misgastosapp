import React, { Component } from 'react';
import store from "./store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer"
import Error from "./components/Error"

class App extends Component{

  render(){
    return( <Provider store={store}>
          <Router>
              <Route component={Header}/>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/registro" component={Registro}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route component={Error}/>
            </Switch>
            <Route component={Footer}/>
          </Router>
        </Provider>)
  }
}

export default App;
