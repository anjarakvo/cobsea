// import "components/Navbar.css";
import React from "react";
import { AppBar, Toolbar, Hidden } from '@mui/material';

import NavBarMobile from "./NavBarMobile";
import NavBarNormal from "./NavBarNormal";

function formatter(text, route) {
  return { text, route }
}

const lists = [
  formatter("Home", "/"),
  formatter("Map", "/map"),
  formatter("Data and Analytics", "/data"),
  formatter("Fact Sheets", "/factsheets"),
  formatter("Feedback", "/feedback"),
  formatter("About", "/about"),
]

const dataOptions = [
  formatter(
    "Custom Data-Subset",
    "/data/custom-data-subset",
  ),
  formatter(
    "Research Landscape",
    "/data/research-landscape",
  ),
  formatter(
    "Methodology and Ontology",
    "/data/methodology-and-ontology",
  ),
  formatter(
    "Scientific Research",
    "/data/scientific-research",
  ),
  formatter(
    "Research in Humanities",
    "/data/research-in-humanities",
  ),
  formatter(
    "Information for Policy-Making",
    "/data/information-for-policy-making",
  ),
]


export default function Navbar() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Hidden smUp>
            <NavBarMobile
              lists={lists}
              dataOptions={dataOptions}
            />
          </Hidden>
          <Hidden only='xs'>
            <NavBarNormal
              lists={lists}
              dataOptions={dataOptions}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}