import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Address, User } from "@/types";
import { loadState, STORAGE_KEYS } from "@/lib/storage";

interface AuthState {
  user: User | null;
  addresses: Address[];
}

const persisted = loadState<AuthState>(STORAGE_KEYS.auth, { user: null, addresses: [] });

const authSlice = createSlice({
  name: "auth",
  initialState: persisted,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      if (action.payload.isDefault) state.addresses.forEach((a) => (a.isDefault = false));
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const idx = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) {
        if (action.payload.isDefault) state.addresses.forEach((a) => (a.isDefault = false));
        state.addresses[idx] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses.forEach((a) => (a.isDefault = a.id === action.payload));
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
} = authSlice.actions;
export default authSlice.reducer;
