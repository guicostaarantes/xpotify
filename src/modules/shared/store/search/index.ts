import { createSlice } from "@reduxjs/toolkit";

import spotifyApi from "#/shared/spotifyApi";

export type SearchState = {
  fetchSearchStatus: "idle" | "loading" | "success" | "fail";
  typing: number;
  searchResult: any;
  searchString: string;
};

const initialState: SearchState = {
  fetchSearchStatus: "idle",
  typing: 0,
  searchResult: {},
  searchString: localStorage.getItem("searchString") || "",
};

const setFetchSearchStatusReducer = (
  state: SearchState,
  action: { payload: SearchState["fetchSearchStatus"] },
) => {
  state.fetchSearchStatus = action.payload;
};

const setTypingReducer = (state: SearchState, action: { payload: number }) => {
  state.typing = action.payload;
};

const setSearchResultReducer = (
  state: SearchState,
  action: { payload: any },
) => {
  state.searchResult = action.payload;
};

const setSearchStringReducer = (
  state: SearchState,
  action: { payload: string },
) => {
  state.searchString = action.payload;
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFetchSearchStatus: setFetchSearchStatusReducer,
    setTyping: setTypingReducer,
    setSearchResult: setSearchResultReducer,
    setSearchString: setSearchStringReducer,
  },
});

export const searchReducer = searchSlice.reducer;

const { setFetchSearchStatus, setTyping, setSearchResult, setSearchString } =
  searchSlice.actions;

export const setSearchResultFromSearchString =
  (searchString: string) => async (dispatch) => {
    if (searchString) {
      try {
        dispatch(setFetchSearchStatus("loading"));
        dispatch(setSearchResult({}));
        const response = await spotifyApi(
          `/search?type=album,artist,track&limit=4&query=${encodeURI(
            searchString,
          )}`,
        );
        if (response.status === 200) {
          const data = await response.json();
          dispatch(setFetchSearchStatus("success"));
          dispatch(setSearchResult(data));
          console.log({ data });
        } else {
          dispatch(setFetchSearchStatus("fail"));
          dispatch(setSearchResult({}));
        }
      } catch {
        dispatch(setFetchSearchStatus("fail"));
        dispatch(setSearchResult({}));
      }
    } else {
      dispatch(setFetchSearchStatus("idle"));
      dispatch(setSearchResult({}));
    }
  };

export const setSearchStringDebounced =
  (value: string, delay: number) => (dispatch, getState) => {
    const typing = Date.now();
    dispatch(setTyping(typing));
    dispatch(setSearchString(value));
    setTimeout(() => {
      if (getState().search.typing === typing) {
        localStorage.setItem("searchString", value);
        dispatch(setTyping(0));
        dispatch(setSearchResultFromSearchString(value));
      }
    }, delay);
  };
