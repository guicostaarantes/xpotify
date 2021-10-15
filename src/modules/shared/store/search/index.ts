import { createSlice } from "@reduxjs/toolkit";

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
  (searchString: string) => async (dispatch, getState) => {
    if (searchString) {
      try {
        dispatch(setFetchSearchStatus("loading"));
        const response = await fetch(
          `${
            process.env.SPOTIFY_API_BASE_URL
          }/search?type=album,artist,track&limit=4&query=${encodeURI(
            searchString,
          )}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${getState().user.token}`,
            },
          },
        );
        if (response.status === 200) {
          const data = await response.json();
          dispatch(setFetchSearchStatus("success"));
          dispatch(setSearchResult(data));
          console.log({ data });
        } else {
          dispatch(setFetchSearchStatus("fail"));
        }
      } catch {
        dispatch(setFetchSearchStatus("fail"));
      }
    } else {
      dispatch(setFetchSearchStatus("idle"));
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
        if (value) dispatch(setSearchResultFromSearchString(value));
      }
    }, delay);
  };
