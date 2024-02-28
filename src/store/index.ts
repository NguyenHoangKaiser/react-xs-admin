import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import { api } from '@/server';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import appReducer from './modules/app';
import routeReducer from './modules/route';
import userReducer from './modules/user';

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appReducer,
  route: routeReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'react-xs',
  storage,
  // whitelist
  whitelist: ['app', 'route', 'user'],
  // blacklist
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

// Inference from Store itself, `rootState` and` appDispatch` type
export type RootState = ReturnType<typeof store.getState>;
// Inference type: {Posts: PostsState, Comments: CommentsState, Users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
