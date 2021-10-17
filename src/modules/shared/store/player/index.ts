import { createSlice } from "@reduxjs/toolkit";

export type PlayerState = {
  track:
    | { id: string; name: string; duration_ms: number; preview_url: string }
    | Record<string, never>;
};

const initialState: PlayerState = {
  track: {},
};

const setTrackReducer = (
  state: PlayerState,
  action: { payload: PlayerState["track"] },
) => {
  state.track = action.payload;
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack: setTrackReducer,
  },
});

export const playerReducer = playerSlice.reducer;

const { setTrack } = playerSlice.actions;

export const selectTrack =
  (track: PlayerState["track"]) => (dispatch, getState) => {
    if (track.id !== getState().player.track.id) {
      console.log({ track });
      dispatch(setTrack(track));
    }
  };
