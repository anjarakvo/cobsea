import { useEffect } from "react";
import { useDispatch } from "react-redux";
import initData from "data/initData.json";
import {
  setIsPending,
  setIsError,
  setIsDataChanged,
  setLastUpdated,
  setErrorInfo,
} from "ssfa-store/slice/rootData";
import {
  textToJson,
  getFromStorage,
  setToStorage,
  compareObject,
  setPositionValue,
} from "ssfa-components/utils/utils";
import { setDataRows, setData } from "ssfa-store/slice/dataExtraction";

// Time to live
// const ttl = 86400000 // 24 hours
const ttl = 10000;

function dataFormatting() {
  let data = getFromStorage("data");
  let position = getFromStorage("position");
  let rows = data.data.table.rows;
  let res = [];

  rows.forEach((item, idx) => {
    let row = item.c;
    res.push({
      id: row[position["ID"]]?.v ?? idx,
      title: row[position["Title"]]?.v,
      translated: row[position["Translated Title"]]?.v,
      authors: row[position["Author(s)"]]?.v,
      research_topics: row[position["Research Topics"]]?.v,
      aim: row[position["Aim of Research"]]?.v,
      coastal: row[position["Coastal or Offshore"]]?.v,
      location_studied: row[position["Location/Territory studied"]]?.v,
      water_body_general: row[position["Water Body_General"]]?.v,
      key_findings: row[position["Key Findings"]]?.v,
      methodologies: row[position["Methodologies Used "]]?.v,
      geographic_scale: row[position["Geographical Scale"]]?.v,
      compartments: row[position["Field Sampling_Compartment"]]?.v,
      polymer: row[position["Plastic Characterisation_Polymer"]]?.v,
      year_published: row[position["Year Published"]]?.v,
      research_group: row[position["Research Group(s)"]]?.v,
      citation: row[position["Citation"]]?.v,
      link: row[position["Link to source"]]?.v,
    });
  });
  return res;
}

const useFetch = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the user current time
    const time = new Date();
    const formattedTime = time.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const now = time.getTime();
    const abortCont = new AbortController();

    // Check previous data if existed
    const storage = getFromStorage("data") ?? initData;

    if (now > storage.expiry) {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) throw Error("Error fetching data");
          return res.text();
        })
        .then((text) => {
          const data = textToJson(text.substr(47).slice(0, -2));
          setToStorage("data", {
            data: data,
            expiry: now + ttl,
            time: formattedTime,
          });
          setPositionValue();
          const res = dataFormatting();
          dispatch(setDataRows(res));
          dispatch(setData(res));
          dispatch(setIsDataChanged(!compareObject(storage.data, data)));
          dispatch(setLastUpdated(formattedTime));
          dispatch(setIsPending(false));
          console.log("Data was fetched");
        })
        .catch((err) => {
          // auto catches network / connection error
          setToStorage("data", storage);
          setPositionValue();
          const res = dataFormatting();
          dispatch(setDataRows(res));
          dispatch(setData(res));
          dispatch(setIsError(true));
          dispatch(setErrorInfo(err.msg));
          dispatch(setIsDataChanged(false));
          dispatch(setIsPending(false));
        });
    } else {
      console.log("Data was not fetched");
      setToStorage("data", storage);
      setPositionValue();
      const res = dataFormatting();
      dispatch(setDataRows(res));
      dispatch(setData(res));
      dispatch(setIsPending(false));
      dispatch(setIsError(false));
      dispatch(setIsDataChanged(false));
      dispatch(setLastUpdated(formattedTime));
    }
    // abort the fetch
    return () => abortCont.abort();
  }, [url, dispatch]);
};

export default useFetch;
