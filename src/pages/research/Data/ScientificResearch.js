import React from 'react';
import { Container } from '@mui/material';
import Header from 'ssfa-components/StyledComponents/Header';
import Body from 'ssfa-components/StyledComponents/Body';
import HeaderRibbon from 'ssfa-components/StyledComponents/HeaderRibbon';
import SideDrawer from 'ssfa-components/Drawer/SideDrawer';
import SubNav from './subnav';

function formatter(title, charts) {
  return { title, charts }
}

function graphFormatter(link, width, height, title) {
  return { link, width, height, title }
}

const SR1 = formatter(
  "SR1. Profile of marine plastic found",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1315077066&format=interactive",
      "100%",
      450,
      "[SR1.B] Commonly reported macro debris items"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=310908260&format=interactive",
      "100%",
      400,
      "[SR1.C] Research topics in water bodies",
    ),
  ]
)

const SR2 = formatter(
  "SR2. Dive into microplastic of publications",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1417951165&format=interactive",
      "70%",
      400,
      "[SR2.A] Plastic size classes studied"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=979294449&format=interactive",
      "70%",
      420,
      "[SR2.B] Commonly reported polymers"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1287719339&format=interactive",
      "70%",
      420,
      "[SR2.C] Commonly reported shapes"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=95783846&format=interactive",
      "100%",
      420,
      "[SR2.D] General research topics within microplastic publications"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=427375937&format=interactive",
      "90%",
      420,
      "[SR2.E] Ecological and environmental impacts"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=854824432&format=interactive",
      "80%",
      420,
      "[SR2.F] Sources and pathways"
    ),
  ]
)

const SR3 = formatter(
  "SR3. Biota sampled",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1324979730&format=interactive",
      "60%",
      420,
      "[SR3.A] Biota sampled, at the phyllum level"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=1352136722&format=interactive",
      "100%",
      420,
      "[SR3.B] Biota sampled in each water body, at the phyllum level"
    ),
  ]
)

const SR4 = formatter(
  "SR4. Compartment sampled",
  [
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=18985962&format=interactive",
      "100%",
      420,
      "[SR4.A] Compartments sampled, by country/territory"
    ),
    graphFormatter(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLlU4Iouaz_ID544mtfTINHRHfP-ELytQ_72AATJfhq95PBNYtWsK-cteZ8JhTexBhUg9cQ9YL47fN/pubchart?oid=97926617&format=interactive",
      "100%",
      420,
      "[SR4.B] Compartments sampled, by water body"
    ),
  ]
)


const Charts = (props) => {

  return (
    <div>
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
              border: '2px solid #9c4a55',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ScientificResearch() {
  const sections = [
    SR1,
    SR2,
    SR3,
    SR4
  ]

  return (
    <div>
      <SubNav />
      <SideDrawer lists={sections} />
      <Container>
        <Body sx={{ backgroundColor: theme => theme.palette.primary.main }}>
          Explore charts and graphs developed to display the characteristics of scientific research publications included in RRI 2.0.
        </Body>

        <HeaderRibbon
          id={SR1.title}
          text={SR1.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={SR1.charts} />

        <HeaderRibbon
          id={SR2.title}
          text={SR2.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={SR2.charts} />

        <HeaderRibbon
          id={SR3.title}
          text={SR3.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={SR3.charts} />

        <HeaderRibbon
          id={SR4.title}
          text={SR4.title}
          variant="h6"
          color="secondary"
        />
        <Charts charts={SR4.charts} />

      </Container>
    </div>
  )
}