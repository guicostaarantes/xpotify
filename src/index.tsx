import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AlbumPage from "#/artist/pages/Album";
import ArtistAlbumsPage from "#/artist/pages/ArtistAlbums";
import MusicPlayer from "#/player/components/MusicPlayer";
import TokenWatcher from "#/shared/components/TokenWatcher";
import store from "#/shared/store";
import StartPage from "#/start/pages/Start";
import TokenPage from "#/start/pages/Token";

import "./global.css";

const XpotifyApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <TokenWatcher />
      <Switch>
        <Route path="/albums/:artistURLString">
          <ArtistAlbumsPage />
        </Route>
        <Route path="/album/:albumId">
          <AlbumPage />
        </Route>
        <Route path="/token">
          <TokenPage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
      <MusicPlayer />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<XpotifyApp />, document.getElementById("xpotify-app"));
