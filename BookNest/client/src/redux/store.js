import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./userSlice";
import { authApi } from "./api/userApi";
import bookReducer from "./bookSlice"

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const bookPersistConfig = {
  key: "book",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBookReducer = persistReducer(bookPersistConfig, bookReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    book: persistedBookReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);

export default store;
