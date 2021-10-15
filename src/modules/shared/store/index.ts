import { configureStore } from "@reduxjs/toolkit";

import { searchReducer } from "#/shared/store//search";
import { userReducer } from "#/shared/store/user";

const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export default store;
