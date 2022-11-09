import { createSlice } from "@reduxjs/toolkit";
import initData from "data/initData.json"
import { getFromStorage } from "ssfa-components/utils/utils";

const rootData = createSlice({
  name: "rootData",
  initialState: {
    databaseLink: 'https://docs.google.com/spreadsheets/d/1yRLGaQk3-9UlopftPr5e8F-X3pKkjwLlZWcTwai6_Ds/gviz/tq?tqx=out:json',
    errorInfo: null,
    isDataChanged: false,
    isError: false,
    isPending: true,
    lastUpdated: getFromStorage("data")?.time.toString() ?? initData.lastUpdated,
  },
  reducers: {
    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setErrorInfo: (state, action) => {
      state.errorInfo = action.payload;
    },
    setIsDataChanged: (state, action) => {
      state.isDataChanged = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    }
  }
})

export const {
  setIsPending,
  setIsError,
  setIsDataChanged,
  setLastUpdated,
  setErrorInfo
} = rootData.actions
export default rootData.reducer