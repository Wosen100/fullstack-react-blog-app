// import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';

export const store = configureStore({
  reducer: {
    exampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;