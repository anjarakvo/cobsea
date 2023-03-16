import { Container } from "@mui/material";
import Body from "ssfa-components/StyledComponents/Body";

const About = () => (
  <Container maxWidth="md" className="body">
    <Body component="div" variant="body1">
      <div>
        The Regional Plastic Pollution Research{" "}
        <a href="https://www.unep.org/cobsea/news/story/cobsea-and-national-university-singapore-launch-database-marine-litter-research-13-asian">
          Database
        </a>{" "}
        and{" "}
        <a href="https://docs.google.com/spreadsheets/d/1yRLGaQk3-9UlopftPr5e8F-X3pKkjwLlZWcTwai6_Ds/edit#gid=751490285&range=A1">
          Inventory
        </a>{" "}
        of the East Asian Seas Regional Node were developed in partnership with
        the National University of Singapore with funding from the{" "}
        <a href="https://www.sea-circular.org">SEA circular</a> project
        implemented jointly by COBSEA and UNEP with support from the Government
        of Sweden. The Database builds on and expands an initial{" "}
        <a href="https://www.unep.org/cobsea/resources/reports/status-research-legal-and-policy-efforts-marine-plastics-asean3">
          scoping of marine litter research
        </a>{" "}
        conducted by COBSEA and NUS in 2019/2020. It provides access to over 700
        peer reviewed publications, research data and visualizations on plastic
        pollution and marine litter from the wider East Asian Seas region,
        across disciplines and languages from the region. It facilitates access
        to research data to inform decision-making and address knowledge gaps
        and policy priorities. The database and inventory will continue to be
        expanded in collaboration with the Regional{" "}
        <a href="https://cobsea.gpmarinelitter.org/research-network">
          Research Network
        </a>{" "}
        of the Regional Node.
        <br />
        <br />
        Visit the regional research inventory of peer reviewed publications{" "}
        <a href="https://tinyurl.com/RRI2-Masterlist">here</a>.
        <br />
        <br />
        The Regional Research Database and The Regional Plastic Pollution
        Research Database, Inventory and Network cover the wider ASEAN+3 region,
        including COBSEA countries, to provide wider access to relevant research
        in the region.
      </div>
    </Body>
  </Container>
);

export default About;
