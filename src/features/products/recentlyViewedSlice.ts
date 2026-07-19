import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState, STORAGE_KEYS } from "@/lib/storage";

interface RecentlyViewedState {
  ids: string[];
}

const initialState: RecentlyViewedState = {
  ids: loadState<string[]>(STORAGE_KEYS.recentlyViewed, []),
};

const MAX = 12;

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    pushRecentlyViewed: (state, action: PayloadAction<string>) => {
      state.ids = [action.payload, ...state.ids.filter((id) => id !== action.payload)].slice(0, MAX);
    },
    clearRecentlyViewed: (state) => {
      state.ids = [];
    },
  },
});

export const { pushRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
