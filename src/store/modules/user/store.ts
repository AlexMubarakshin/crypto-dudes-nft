import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type UserStoreState = {
  accountId?: string
};

const initialState: UserStoreState = {
  accountId: undefined,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload;
    },
  },
});

export const selectAccountId = (state: RootState) => state.user.accountId;

export const { actions, reducer } = slice;
