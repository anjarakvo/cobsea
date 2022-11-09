import { configureStore } from '@reduxjs/toolkit';
import dataExtracitonReducer from './slice/dataExtraction';
import rootDataReducer from './slice/rootData';

export default configureStore({
  reducer: {
    dataExtraction: dataExtracitonReducer,
    rootData: rootDataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})