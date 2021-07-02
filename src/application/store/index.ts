import { 
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import premiumSlice from './premium';
import userSlice from './user';
import totalSlice from './total';
import archivedSlice from './archived';
import tokenlistSlice from './tokenlist';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    premium: premiumSlice.reducer,
    archived: archivedSlice.reducer,
    total: totalSlice.reducer,
    tokenlist: tokenlistSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return process.env.NODE_ENV === 'development' 
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware()
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;