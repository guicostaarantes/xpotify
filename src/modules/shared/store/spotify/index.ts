import { createSlice } from "@reduxjs/toolkit";

export type SpotifyState = {
  fetchUserStatus: "idle" | "loading" | "success" | "fail";
  typing: number;
  token: string;
  userName: string;
};

const initialState: SpotifyState = {
  fetchUserStatus: "idle",
  typing: 0,
  token: localStorage.getItem("token") || "",
  userName: "",
};

const setFetchUserStatusReducer = (
  state: SpotifyState,
  action: { payload: SpotifyState["fetchUserStatus"] },
) => {
  state.fetchUserStatus = action.payload;
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
    setFetchUserStatus: setFetchUserStatusReducer,
    setTyping: setTypingReducer,
    setToken: setTokenReducer,
    setUserName: setUserNameReducer,
  },
});

export const spotifyReducer = spotifySlice.reducer;

const { setFetchUserStatus, setTyping, setToken, setUserName } =
  spotifySlice.actions;

export const setUserDataFromToken = (token: string) => async (dispatch) => {
  try {
    if (token) {
      dispatch(setFetchUserStatus("loading"));
      const response = await fetch(`${process.env.SPOTIFY_API_BASE_URL}/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        dispatch(setFetchUserStatus("success"));
        dispatch(setUserName(data.display_name));
      } else {
        dispatch(setFetchUserStatus("fail"));
        dispatch(setUserName(""));
      }
    } else {
      dispatch(setFetchUserStatus("idle"));
    }
  } catch {
    dispatch(setFetchUserStatus("fail"));
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
        if (value) dispatch(setUserDataFromToken(value));
      }
    }, delay);
  };
