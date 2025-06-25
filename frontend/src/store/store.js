//Config redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import themeReducer from "./theme/themeSlice";
import postReducer from "./slice/postSlice";

//Config redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Config persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  post: postReducer,
});

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
