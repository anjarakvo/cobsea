import { createSlice } from "@reduxjs/toolkit";

function formatter(headerName, field, width) {
  return { field, headerName, width }
}

const initColumnsHeader = [
  formatter(
    "ID",
    "id",
    80
  ),
  formatter(
    "Title",
    "title",
    250
  ),
  formatter(
    "Translated title",
    "translated",
    120
  ),
  formatter(
    "Author(s)",
    "authors",
    250
  ),
  formatter(
    "Research Topics",
    "research_topics",
    250
  ),
  formatter(
    "Aim of Research",
    "aim",
    400
  ),
  formatter(
    "Coastal or Offshore",
    "coastal",
    150
  ),
  formatter(
    "Location/Territory studied",
    "location_studied",
    200
  ),
  formatter(
    "Water Body General",
    "water_body_general",
    180
  ),
  formatter(
    "Key Findings",
    "key_findings",
    600
  ),
  formatter(
    "Methodologies Used",
    "methodologies",
    300
  ),
  formatter(
    "Geographic scale",
    "geographic_scale",
    160
  ),
  formatter(
    "Compartments",
    "compartments",
    150
  ),
  formatter(
    "Plastic characterisation",
    "polymer",
    200
  ),
  formatter(
    "Year Published",
    "year_published",
    150
  ),
  formatter(
    "Research Group",
    "research_group",
    300
  ),
  formatter(
    "Citation",
    "citation",
    400
  ),
  formatter(
    "Link",
    "link",
    100
  ),
]

const initColumnsOrder = initColumnsHeader.map(col => col.headerName)

const dataExtractionSlice = createSlice({
  name: "dataExtraction",
  initialState: {
    columnHeaders: initColumnsHeader,
    columnOrderLong: initColumnsHeader,
    columnOrder: initColumnsOrder,
    data: [],
    databaseLink: "https://tinyurl.com/RRI2-Masterlist",
    dataRows: [],
    searchDisplay: "",
    searchKeywords: [""],

  },
  reducers: {
    setSearchDisplay: (state, action) => {
      state.searchDisplay = action.payload;
    },
    setSearchKeywords: (state, action) => {
      state.searchKeywords = action.payload.split(' ');
    },
    setDataRows: (state, action) => {
      state.dataRows = action.payload
    },
    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setColumnOrderLong: (state, action) => {
      state.columnOrderLong = action.payload
    }
  }
})

export const {
  setSearchDisplay,
  setSearchKeywords,
  setDataRows,
  setColumnOrder,
  setData,
  setColumnOrderLong
} = dataExtractionSlice.actions
export default dataExtractionSlice.reducer;