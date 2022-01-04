import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type ConnectionStoreState = {
  connected: boolean
  error?: string
  loading: boolean
};

const initialState: ConnectionStoreState = {
  connected: false,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    connectRequest: (state) => {
      state.loading = true;
    },
    connectSuccess: (state) => {
      state.connected = true;
      state.loading = false;
      state.error = undefined;
    },
    connectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectConnected = (state: RootState): boolean => state.connection.connected;
export const selectConnecting = (state: RootState): boolean => state.connection.loading;
export const selectErrorMessage = (state: RootState): string | undefined => state.connection.error;

export const { actions, reducer } = slice;
