import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import api from '../lib/axios';
export interface User {
    _id: string
    name: string
    email: string
}

interface AuthState {
  token: string | null;
  user: User | null
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async () => {  
    const res = await api.get(`/auth/me`);
    console.log(res.data)
  return res.data.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{accessToken: string, user: User}>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.accessToken);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch User';
          state.loading = false;
        });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
