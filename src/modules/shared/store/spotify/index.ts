import { createSlice } from "@reduxjs/toolkit";

export type SpotifyState = {
  token: string;
};

const initialState: SpotifyState = {
  token: "",
};

const setTokenReducer = (state: SpotifyState, action: { payload: string }) => {
  state.token = action.payload;
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setToken: setTokenReducer,
  },
});

export const { actions: spotifyActions, reducer: spotifyReducer } =
  spotifySlice;
