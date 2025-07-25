import React from 'react';
import { Typography, Container, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import Header from 'ssfa-components/StyledComponents/Header';
import Body from 'ssfa-components/StyledComponents/Body';
import Masonry from 'react-masonry-css';

function factsheetFormatter(title, description, link) {
  return {
    title,
    description,
    link,
  };
}

// const factsheets = [
//   factsheetFormatter(
//     '1. Research on Marine Plastics 101',
//     'Introduction to marine plastic research in the region, plastics sizes used as reference, understanding of sources, limitations in the knowledge that can be derived from publications and shaping hypotheses.',
//   ),
//   factsheetFormatter(
//     '2. Research landscape',
//     'Overview of the main features of marine plastic research in the region: research efforts in different countries/territories, parts of the marine environment, research topics, types of polymers, scientific research and humanities.',
//   ),
//   factsheetFormatter(
//     '3. Plastic in sensitive habitats',
//     'Profile of research approach, findings and gaps in the study of the concentration of marine plastics in mangrove, seagrass beds and coral reefs and understanding of their impact on them.',
//   ),
//   factsheetFormatter(
//     "4. Marine plastics & biota",
//     "Profile of the research effort , findings and gaps involving intake of marine plastics by marine organisms, their transfer through the food chain, the general impact of marine plastics on marine life, as well as the role of biota in the fragmentation process.",
//   ),
//   factsheetFormatter(
//     "5. Marine microplastics",
//     "Research effort, methodology and findings in the sampling and understanding of abundance and distribution of microplastics in the marine environment. Societal concerns and responses are also included.",
//   ),
//   factsheetFormatter(
//     "6. Contaminants, microbes & plastisphere",
//     "Profile of research effort on the respective linkages between marine plastics and (i) abiotic contaminants; and (ii) microbial assemblages and biofilm that form the plastisphere. Gaps and prospects are included.",
//   ),
//   factsheetFormatter(
//     "7. Fisheries and fishing gear",
//     "Research effort and findings on the contribution from fisheries and aquaculture activities to marine plastics and of the response measures adopted.",
//   ),
//   factsheetFormatter(
//     "8. Single-use plastics and consumer plastics",
//     "Assessment of the understanding of contribution of single-use and consumer plastics to the marine environment, of the measures adopted.",
//   ),
//   factsheetFormatter(
//     "9. Social and cultural research",
//     "Profile of research and findings on non-monetary social  and cultural aspects of pollution from marine plastics, including local communities' behaviours, community-based solutions, awareness raising and public education.",
//   ),
//   factsheetFormatter(
//     "10. Economic costs, risks and hotspots",
//     "Profile of research and findings on the understanding of economic costs generated by marine plastic litters in the marine environment and on the coastline, including the consideration of hotspots as a source of greater economic and social risk.",
//   ),
//   factsheetFormatter(
//     "11. Regional features: tropical condition, extreme events and hazards",
//     "Research findings on the relationship of regional features to the status of pollution from marine plastic, in particular the tropical climate condition, extreme events and hazards."
//   ),
//   factsheetFormatter(
//     "12. Response measures and gaps in understanding",
//     "Overview of findings identified in the publications on response measures adopted in the region and key-gaps in knowledge and understanding that need filling for the design of a more comprehensive  policy response."
//   )
// ]

const factsheets = [
  factsheetFormatter(
    'Marine plastic research 101',
    'Introduction to marine plastic research in the region, plastics sizes used as reference, understanding of sources and pathways, limitations in the knowledge that can be derived from publications and shaping hypotheses.',
    'https://nbviewer.org/github/Marine-Litter-Research-Inventory/pdf/blob/main/Research%20101%20Factsheet.pdf'
  ),
  factsheetFormatter(
    'Marine microplastics',
    'Research effort, methodology and findings in the sampling and understanding of abundance and distribution of microplastics in the marine environment. Societal concerns and responses are also included.',
    'https://nbviewer.org/github/Marine-Litter-Research-Inventory/pdf/blob/main/Marine%20microplastics%20Factsheet%20%28NJ%29.pdf'
  ),
];

const CustomizePaper = ({ title, description, link }) => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.quaternary.main,
    color: 'white',
    margin: '0.5rem',
    padding: 20,
    textAlign: 'center',
  }));

  const PaperTitle = ({ title }) => {
    return (
      <Typography
        variant="body1"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {title}
      </Typography>
    );
  };

  const PaperDescription = ({ description }) => {
    return (
      <Typography
        variant="subtitle2"
        style={{
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        {description}
      </Typography>
    );
  };

  return (
    <StyledPaper>
      <PaperTitle title={title} />
      <PaperDescription description={description} />
      <Button
        onClick={() => window.open(link, '_blank')}
        variant="contained"
        color="secondary"
      >
        View it here
      </Button>
      {/* <Skeleton variant="rectangular" width="100%" height="300px" /> */}
    </StyledPaper>
  );
};

export default function Factsheets() {
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  return (
    <div className="container">
      <div className="wrapper">
        The fact sheets below have been developed to provide a summary of the
        data captured in the RRI 2.0 and derive knowledge that can inform
        policy-making as well as new research. They are designed to be updated
        as new data become available. New topics are to be included in the
        future as possible and useful.
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_columns"
      >
        {factsheets.map((factsheet, idx) => (
          <React.Fragment key={idx}>
            <CustomizePaper
              title={factsheet.title}
              description={factsheet.description}
              link={factsheet.link}
            />
          </React.Fragment>
        ))}
      </Masonry>
    </div>
  );
}
