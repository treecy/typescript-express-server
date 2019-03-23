import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import UserList from './UserList';

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/users/" component={UserList} />
      </div>
    </Router>
  );
}

