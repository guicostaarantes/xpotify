import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import store from "#/shared/store";
import Index from "#/start/pages/Index";

import "./global.css";

const XpotifyApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<XpotifyApp />, document.getElementById("xpotify-app"));
