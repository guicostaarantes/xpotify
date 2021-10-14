import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "#/start/pages/Index";

import "./global.css";

const XpotifyApp = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Index />
      </Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<XpotifyApp />, document.getElementById("xpotify-app"));
