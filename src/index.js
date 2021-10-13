import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./global.css";
import Index from "./modules/start/pages/Index";

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
