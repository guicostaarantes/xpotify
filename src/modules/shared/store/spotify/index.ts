import { createSlice } from "@reduxjs/toolkit";

export type SpotifyState = {
  typing: number;
  token: string;
  userName: string;
};

const initialState: SpotifyState = {
  typing: 0,
  token: localStorage.getItem("token"),
  userName: "",
};

const setTypingReducer = (state: SpotifyState, action: { payload: number }) => {
  state.typing = action.payload;
};

const setTokenReducer = (state: SpotifyState, action: { payload: string }) => {
  state.token = action.payload;
};

const setUserNameReducer = (
  state: SpotifyState,
  action: { payload: string },
) => {
  state.userName = action.payload;
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setTyping: setTypingReducer,
    setToken: setTokenReducer,
    setUserName: setUserNameReducer,
  },
});

export const spotifyReducer = spotifySlice.reducer;

const { setTyping, setToken, setUserName } = spotifySlice.actions;

export const setUserDataFromToken = (token: string) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.SPOTIFY_API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setUserName(data.display_name));
  } catch {
    dispatch(setUserName(""));
  }
};

export const setTokenDebounced =
  (value: string, delay: number) => (dispatch, getState) => {
    const typing = Date.now();
    dispatch(setTyping(typing));
    dispatch(setToken(value));
    setTimeout(() => {
      if (getState().spotify.typing === typing) {
        localStorage.setItem("token", value);
        dispatch(setTyping(0));
        dispatch(setUserDataFromToken(value));
      }
    }, delay);
  };
