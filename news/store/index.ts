import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 永続化の設定
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, //async-storageに保存
}

// 複数のreducerを束ねるのに使用
const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // warningを防止: https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
