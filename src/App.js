import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ItemsPage } from './Components/Items/Items';
import { ShowRoom } from './Components/ShowRoom/ShowRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ItemsPage}></Route>
        <Route path="/model/:id" component={ShowRoom}></Route>
      </Switch>
    </Router>
  );
}

export default App;
