import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import TrelloClass from "../components/TrelloClass";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/:classID" component={TrelloClass} />
      </div>
    </Router>
  );
};

export default AppRouter;
