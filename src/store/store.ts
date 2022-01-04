import { configureStore } from '@reduxjs/toolkit';

import {
  connectionModule,
  gameModule,
  nftModule,
  userModule,
} from './modules';

export const store = configureStore({
  reducer: {
    connection: connectionModule.reducer,
    game: gameModule.reducer,
    nft: nftModule.reducer,
    user: userModule.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
