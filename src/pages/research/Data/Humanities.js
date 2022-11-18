import React from "react";
import { Container, Grid } from "@mui/material";
import Header from "ssfa-components/StyledComponents/Header";
import Body from "ssfa-components/StyledComponents/Body";
import HeaderRibbon from "ssfa-components/StyledComponents/HeaderRibbon";
import SideDrawer from "ssfa-components/Drawer/SideDrawer";
import DataTable from "ssfa-components/Table/DataTable";
import { getFromStorage } from "ssfa-components/utils/utils";
import StyledLink from "ssfa-components/StyledComponents/StyledLink";
import DefaultTableInstruction from "ssfa-components/Table/DefaultTableInstruction";
import SubNav from "./subnav";

function formatter(title, charts) {
  return { title, charts };
}

function graphFormatter(link, width, height, title) {
  return { width, height, link, title };
}

function columnFormatter(field, headerName, width) {
  return { field, headerName, width };
}

function getDataRows() {
  const data = getFromStorage("data");
  const position = getFromStorage("position");
  const rows = data.data.table.rows;
  let res = [];

  rows.forEach((item) => {
    let row = item.c;
    const type = row[position["Sci/Humanities"]]?.v.trim() ?? "";
    if (!type.includes("Science"))
      res.push({
        id: row[position["ID"]]?.v,
        research_topics: row[position["Research Topics"]]?.v,
        aim: row[position["Aim of Research"]]?.v,
        link: row[position["Link to source"]]?.v,
      });
  });

  return res;
}

const columnOrderLong = [
  columnFormatter("research_topics", "Research topics", 300),
  columnFormatter("aim", "Aim of Research", 700),
  columnFormatter("id", "ID", 100),
  columnFormatter("link", "Link", 80),
];

const H1 = formatter("H1. Profile of humanities research", [
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=495677648&format=interactive",
    "100%",
    360,
    "[H1.A] General research topics"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1597143242&format=interactive",
    "100%",
    360,
    "[H1.B] Specific research topics"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=918480549&format=interactive",
    "100%",
    360,
    "[H1.C] General research topics by country/territory"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=564401057&format=interactive",
    "100%",
    360,
    "[H1.D] General research topics by water body"
  ),
]);

const H2 = formatter("H2. Dive into research topics per country", [
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1662269792&format=interactive",
    "100%",
    400,
    "[H2.A] Fisheries & aquaculture-related"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=560123524&format=interactive",
    "100%",
    400,
    "[H2.B] Policy, legal and regulatory research"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1862835104&format=interactive",
    "100%",
    400,
    "[H2.C] Social and behaviour research"
  ),
  graphFormatter(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1060677156&format=interactive",
    "100%",
    400,
    "[H2.D] Economic research"
  ),
]);

const H3 = formatter("H3. Aims of research for research topics", []);

const filters = [
  "Laws, administrative measures",
  "Legal or regulatory analysis",
  "Action Plans",
  "Compliance and implementation",
  "Human health/food safety",
  "Communication and coverage of marine plastic",
  "Citizen science",
  "Re-use, recycle and other mitigation measures",
  "Other market-based measures (EPR)",
  "Policy",
  "Social perceptions/Social behavioural studies",
  "Survey and monitoring/pollution status",
  "Research framework and coordination",
  "Economic loss and cost",
];

const Charts = (props) => {
  return (
    <div id={props.id}>
      {props.charts.map((chart, idx) => (
        <div
          id={chart.title}
          key={idx}
          style={{ margin: 20, justifyContent: "center", display: "flex" }}
        >
          <iframe
            title={`${props?.text} chart ${idx}`}
            src={chart.link}
            width={chart.width}
            height={chart.height}
            seamless
            scrolling="no"
            style={{
              border: "2px solid #f0c8b6",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default function Humanities() {
  const [dataRows] = React.useState(getDataRows());

  const sections = [H1, H2, H3];

  return (
    <div>
      <SubNav />
      <SideDrawer lists={sections} />
      <Container>
        <Body>
          Explore charts and graphs developed to display the characteristics of
          humanities research publiublications included in RRI 2.0 in the legal,
          policy, social, economic and cultural fields of research.
        </Body>

        <HeaderRibbon
          id={H1.title}
          text={H1.title}
          variant="h6"
          color="secondary"
        />
        <Body>
          This section analyses research topics examined in humanities
          publication. Visit the Guidance to the Research Inventory metadata
          fields in&nbsp;
          <StyledLink to="/data/methodology-and-ontology">
            Methodology and Ontology
          </StyledLink>
          &nbsp;for more information on each research topic.
        </Body>
        <Charts charts={H1.charts} />

        <HeaderRibbon
          id={H2.title}
          text={H2.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={H2.charts} />

        <HeaderRibbon
          id={H3.title}
          text={H3.title}
          variant="h6"
          color="secondary"
        />
        <Body component={"div"}>
          <DefaultTableInstruction />
          &nbsp;You can search for the following relevant research topics in
          these humanities publications, using the "FILTERS" function:
          <br />
          <br />
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              marginLeft: "1rem",
              fontSize: "0.95rem",
            }}
          >
            {filters.map((filter, idx) => (
              <Grid key={idx} item xs={11} sm={6} md={4}>
                <li>{filter}</li>
              </Grid>
            ))}
          </Grid>
        </Body>
        <DataTable dataRows={dataRows} columnOrderLong={columnOrderLong} />
        <br />
        <br />
      </Container>
    </div>
  );
}
