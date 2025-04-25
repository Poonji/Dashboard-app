import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './store/WidgetSlice';

export const store = configureStore({
  reducer: {
    widget: widgetReducer,
  },
});
