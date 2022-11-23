// import React, { useEffect, useState } from "react";
import React from "react";
import { Container, Link } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "ssfa-components/StyledComponents/Header";
import Body from "ssfa-components/StyledComponents/Body";

import MapGenerator from "ssfa-components/Map/MapGenerator";

export default function Map({ isDataChanged = false }) {
  const { databaseLink } = useSelector((state) => state.dataExtraction);

  return (
    <>
      <Container maxWidth="md">
        <Body component="div" variant="body1" style={{ marginTop: 20 }}>
          This interactive map provides a visual representation of the
          geographic extent of RRI 2.0 as well as an extract of data analysis.
          When clicking on a country/territory, the following information is
          provided in relation to that country/territory:
          <br />
          <br />
          First, the total number of publications in RRI 2.0; Second, the number
          of publications on sub-topics is included: Science-only,
          Humanities-only, Both (i.e. Science and Humanities), Laboratory-based,
          Desktop-based, Field sampling, Microplastic, Macroplastic, Fishing
          gear, Legal/Regulatory, Social/Cultural, Economic/Management, Policy
          Study.
          <br />
          {/* <br />
          The RRI 2.0 can be accessed&nbsp;
          <Link
            color="secondary"
            href={databaseLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            here
          </Link>
          . */}
        </Body>
        <MapGenerator />
      </Container>
    </>
  );
}
