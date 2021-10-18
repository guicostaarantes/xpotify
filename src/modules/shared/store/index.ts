import { configureStore } from "@reduxjs/toolkit";

import { historyReducer } from "#/shared/store/history";
import { playerReducer } from "#/shared/store/player";
import { searchReducer } from "#/shared/store/search";
import { userReducer } from "#/shared/store/user";

const store = configureStore({
  reducer: {
    history: historyReducer,
    player: playerReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export default store;
