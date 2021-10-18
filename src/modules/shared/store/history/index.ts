import { createSlice } from "@reduxjs/toolkit";

export type HistoryState = {
  latestVisitedAlbums: Array<any>;
};

const initialState: HistoryState = {
  latestVisitedAlbums: JSON.parse(
    localStorage.getItem("latestVisitedAlbums") || "[]",
  ),
};

const setLatestVisitedAlbumsReducer = (
  state: HistoryState,
  action: { payload: Array<string> },
) => {
  state.latestVisitedAlbums = action.payload;
};

const HistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setLatestVisitedAlbums: setLatestVisitedAlbumsReducer,
  },
});

export const historyReducer = HistorySlice.reducer;

const { setLatestVisitedAlbums } = HistorySlice.actions;

export const visitAlbum = (album: any) => (dispatch, getState) => {
  const oldList: Array<any> = getState().history.latestVisitedAlbums;
  const newList = oldList.filter((alb) => alb.id !== album.id).slice(0, 3);
  newList.unshift({
    id: album.id,
    name: album.name,
    artists: album.artists,
    images: album.images,
  });
  dispatch(setLatestVisitedAlbums(newList));
  localStorage.setItem("latestVisitedAlbums", JSON.stringify(newList));
};
