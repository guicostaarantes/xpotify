import { createSlice } from "@reduxjs/toolkit";

import spotifyApi from "#/shared/spotifyApi";

export type UserState = {
  fetchUserStatus: "idle" | "loading" | "success" | "fail";
  typing: number;
  token: string;
  user:
    | {
        name: string;
        image: string;
      }
    | Record<string, never>;
};

const initialState: UserState = {
  fetchUserStatus: "idle",
  typing: 0,
  token: localStorage.getItem("token") || "",
  user: {},
};

const setFetchUserStatusReducer = (
  state: UserState,
  action: { payload: UserState["fetchUserStatus"] },
) => {
  state.fetchUserStatus = action.payload;
};

const setTypingReducer = (state: UserState, action: { payload: number }) => {
  state.typing = action.payload;
};

const setTokenReducer = (state: UserState, action: { payload: string }) => {
  state.token = action.payload;
};

const setUserReducer = (
  state: UserState,
  action: { payload: UserState["user"] },
) => {
  state.user = action.payload;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFetchUserStatus: setFetchUserStatusReducer,
    setTyping: setTypingReducer,
    setToken: setTokenReducer,
    setUser: setUserReducer,
  },
});

export const userReducer = userSlice.reducer;

const { setFetchUserStatus, setTyping, setToken, setUser } = userSlice.actions;

export const setUserDataFromToken = (token: string) => async (dispatch) => {
  try {
    if (token) {
      dispatch(setFetchUserStatus("loading"));
      const response = await spotifyApi("/me");
      if (response.status === 200) {
        const data = await response.json();
        dispatch(setFetchUserStatus("success"));
        dispatch(
          setUser({
            name: data.display_name,
            image: data.images?.[0].url || "",
          }),
        );
      } else {
        dispatch(setFetchUserStatus("fail"));
        dispatch(setUser({}));
      }
    } else {
      dispatch(setFetchUserStatus("idle"));
    }
  } catch {
    dispatch(setFetchUserStatus("fail"));
    dispatch(setUser({}));
  }
};

export const setTokenDebounced =
  (value: string, delay: number) => (dispatch, getState) => {
    const typing = Date.now();
    dispatch(setTyping(typing));
    dispatch(setToken(value));
    setTimeout(() => {
      if (getState().user.typing === typing) {
        localStorage.setItem("token", value);
        dispatch(setTyping(0));
        dispatch(setUserDataFromToken(value));
      }
    }, delay);
  };
