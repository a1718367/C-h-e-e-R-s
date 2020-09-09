import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Signup from './scenes/Signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
