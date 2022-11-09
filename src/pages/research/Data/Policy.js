import React from 'react';
import { Container } from '@mui/material';
import Header from 'ssfa-components/StyledComponents/Header';
import Body from 'ssfa-components/StyledComponents/Body';
import HeaderRibbon from 'ssfa-components/StyledComponents/HeaderRibbon';

import DataTable from "ssfa-components/Table/DataTable";
import { getFromStorage } from 'ssfa-components/utils/utils';
import StyledLink from 'ssfa-components/StyledComponents/StyledLink';
import SideDrawer from 'ssfa-components/Drawer/SideDrawer';
import DefaultTableInstruction from 'ssfa-components/Table/DefaultTableInstruction';
import SubNav from './subnav';

function formatter(title, charts) {
  return { title, charts }
}

function graphFormatter(link, width, height, title) {
  return { width, height, link, title }
}

function columnFormatter(field, headerName, width) {
  return { field, headerName, width }
}

function getDataRows() {
  const data = getFromStorage('data');
  const position = getFromStorage('position');
  const rows = data.data.table.rows
  let res = []

  rows.forEach(item => {
    let row = item.c
    const type = row[position["Sci/Humanities"]]?.v.trim() ?? ""
    if (!type.includes("Humanities")) {
      let temp = {}
      columnOrderLong.forEach(col => {
        temp[col.field] = row[position[col.headerName]]?.v
      })
      res.push(temp)
    }
  })

  return res
}

const columnOrderLong = [
  columnFormatter(
    "field_sampling_compartment",
    "Field Sampling_Compartment",
    300
  ),
  columnFormatter(
    "macro_mean_abundance_count",
    "Macro_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "macro_mean_abundance_weight",
    "Macro_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "water_mean_abundance_count",
    "Water_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "water_mean_abundance_weight",
    "Water_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "shoreline_sediment_mean_abundance_count",
    "Shoreline Sediment_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "shoreline_sediment_mean_abundance_weight",
    "Shoreline Sediment_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "seabed_sediment_mean_abundance_count",
    "Seabed Sediment_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "seabed_sediment_mean_abundance_weight",
    "Seabed Sediment_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "mangrove_mean_abundance_count",
    "Mangrove_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "mangrove_mean_abundance_weight",
    "Mangrove_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "biiota_mean_abundance_count",
    "Biota_Mean Abundance_Count",
    300
  ),
  columnFormatter(
    "biota_mean_abundance_weight",
    "Biota_Mean Abundance_Weight",
    300
  ),
  columnFormatter(
    "id",
    "ID",
    80
  ),
  columnFormatter(
    "link",
    "Link to source",
    80
  ),
]

const PM1 = formatter(
  "PM1. Sources of marine plastics",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1748871634&format=interactive",
      "100%",
      400,
      "[PM1.A] General sources of marine plastics studied"
    ),
  ]
)

const PM2 = formatter(
  "PM2. Adoption of GESAMP Guidelines",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1228393788&format=interactive",
      "100%",
      400,
      "[PM2.A] Adopted GESAMP plastic sizes by countries/territories"
    ),
  ]
)

const PM3 = formatter(
  "PM3. Sampling and units recording",
  []
)

const PM4 = formatter(
  "PM4. Biota studied",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=821300668&format=interactive",
      "100%",
      400,
      "[PM4.A] Biota studied, by water body"
    ),
  ]

)
const PM5 = formatter(
  "PM5. Fisheries and aquaculture",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1748863372&format=interactive",
      "100%",
      400,
      "[PM5.A] Fisheries and aquaculture as sources of marine plastics"
    ),
  ]
)

const Charts = (props) => {

  return (
    <div id={props.id}>
      {props.charts.map((chart, idx) => (
        <div id={chart.title} key={idx} style={{ margin: 20, justifyContent: 'center', display: 'flex' }}>
          <iframe
            title={`${props?.text} chart ${idx}`}
            src={chart.link}
            width={chart.width}
            height={chart.height}
            seamless
            scrolling="no"
            style={{
              border: '2px solid #f0c8b6',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Policy() {
  const [dataRows] = React.useState(getDataRows())

  const sections = [
    PM1,
    PM2,
    PM3,
    PM4,
    PM5
  ]

  return (
    <div>
      <SubNav />
      <SideDrawer lists={sections} />
      <Container>
        <Body>
          Explore charts and graphs on insight that may be gained from the data captured in RRI 2.0 for policy-making purposes. This section brings together findings from publications in science and humanities, including from the graphs above. Refer to the&nbsp;
          <StyledLink to="/factsheets">
            Factsheet
          </StyledLink>
          &nbsp;on Marine Plastic Research 101 for Policy-Makers for further guidance on the use of this data.
        </Body>

        <HeaderRibbon
          id={PM1.title}
          text={PM1.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={PM1.charts} />

        <HeaderRibbon
          id={PM2.title}
          text={PM2.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={PM2.charts} />

        <HeaderRibbon
          id={PM3.title}
          text={PM3.title}
          variant="h6"
          color="secondary"
        />
        <Body align="justify">
          <DefaultTableInstruction />
        </Body>
        <DataTable
          dataRows={dataRows}
          columnOrderLong={columnOrderLong}
        />

        <HeaderRibbon
          id={PM4.title}
          text={PM4.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={PM4.charts} />

        <HeaderRibbon
          id={PM5.title}
          text={PM5.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={PM5.charts} />

      </Container>
    </div>
  )
}