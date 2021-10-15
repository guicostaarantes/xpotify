import { configureStore } from "@reduxjs/toolkit";

import { searchReducer } from "#/shared/store//search";
import { spotifyReducer } from "#/shared/store/spotify";

const store = configureStore({
  reducer: {
    search: searchReducer,
    spotify: spotifyReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export default store;
