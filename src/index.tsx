import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import store from "#/shared/store";
import StartPage from "#/start/pages/Start";
import TokenPage from "#/start/pages/Token";

import "./global.css";

const XpotifyApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/token">
          <TokenPage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<XpotifyApp />, document.getElementById("xpotify-app"));
