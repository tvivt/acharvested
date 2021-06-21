import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import premiumSlice from './premium';
import userSlice from './user';
import totalSlice from './total';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    premium: premiumSlice.reducer,
    total: totalSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return process.env.NODE_ENV === 'development' 
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware()
  }
});

export default store;