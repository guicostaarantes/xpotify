import { createSlice } from "@reduxjs/toolkit";

import { Album } from "#/shared/spotifyApi/types";

export type HistoryState = {
  latestVisitedAlbums: Array<Album>;
};

const initialState: HistoryState = {
  latestVisitedAlbums: JSON.parse(
    localStorage.getItem("latestVisitedAlbums") || "[]",
  ),
};

const setLatestVisitedAlbumsReducer = (
  state: HistoryState,
  action: { payload: HistoryState["latestVisitedAlbums"] },
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

export const visitAlbum = (album: Album) => (dispatch, getState) => {
  const oldList: Array<Album> = getState().history.latestVisitedAlbums;
  const newList = oldList.filter((alb) => alb.id !== album.id).slice(0, 3);
  newList.unshift({
    id: album.id,
    name: album.name,
    artists: album.artists,
    images: album.images,
    tracks: {},
  });
  dispatch(setLatestVisitedAlbums(newList));
  localStorage.setItem("latestVisitedAlbums", JSON.stringify(newList));
};
