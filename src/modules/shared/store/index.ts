import { configureStore } from "@reduxjs/toolkit";

import { spotifyReducer } from "#/shared/store/spotify";

const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export default store;
