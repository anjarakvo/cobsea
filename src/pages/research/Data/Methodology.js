import React from "react";
import { Container, Link, Grid } from "@mui/material";
import Header from "ssfa-components/StyledComponents/Header";
import Body from "ssfa-components/StyledComponents/Body";
import HeaderRibbon from "ssfa-components/StyledComponents/HeaderRibbon";
import SubHeader from "ssfa-components/StyledComponents/SubHeader";
import SubNav from "./subnav";

const articleFilters = [
  "ID",
  "Academic type",
  "Year Published",
  "Geographical Scale",
  "Country/territory studied",
  "Type",
  "Link to source",
  "Language",
  "Citation",
  "Title",
  "Translated title",
  "Author(s)",
  "First Author",
  "Corresponding author",
  "Journal",
  "Editor(s)",
  "Book Title",
  "Research Group(s)",
  "Country/territory of Research Institution",
  "Funding Information",
];

const researchScopeFilters = [
  "Aim of research",
  "Period of study",
  "Period of study_Year",
  "Location of work",
  "Relevant water body_Detailed",
  "Relevant water body_General",
  "Coastal or offshore study",
  "Plastic sizes examined",
  "Adopted GESAMP size",
  "Microplastic size",
  "Contaminants examined",
  "Fishing gear examined",
  "Legal/regulatory study",
  "Social/cultural study",
  "Economic/management study",
  "Policy study",
];

const researchMethdologyFilters = [
  "Methodologies Used",
  "Field sampling_Conducted",
  "Field sampling_Compartment",
  "Field sampling_Frequency",
  "Survey/interview_Conducted",
  "Other sampling_Type",
  "Biota_Species",
  "Biota_Phyllum",
  "Biota_Applied",
  "Common names",
  "Literature review_Conducted",
  "Literature review_Volume",
  "Desktop/deductive analysis",
  "Modeling_Conducted",
  "Modeling_Type Plankton net_Mesh size",
  "Water sampling_Depth",
  "Shoreline sediment sampling_ Depth",
  "Seabed sediment sampling_Depth",
  "Mangrove/mudflat sediment Sampling_Depth",
  "Control/blanks",
];

const methodologiesUsedFilters = [
  "Review (literature or social)",
  "Monitoring",
  "Quantification",
  "Identification",
  "Sampling",
  "Simulation model",
  "In-situ experimental work",
  "Laboratory experimental work (Sorption of pollutants/chemicals)",
  "Laboratory experimental work (Toxicity of plastic on development in marine biota life stages)",
  "Laboratory experimental work (Heavy metal analysis)",
  "Plastics extraction/preparation",
  "Plastics characterisation, identification, quantification",
  "Remote imagery and analysis ",
  "Field study (Socio/economic)",
  "Social survey/Interview/Questionnaire",
  "Desktop quantitative analysis",
  "Desktop qualitative analysis",
];

const researchFindingsFilters = [
  "Key Findings",
  "Source of Plastics",
  "Source of Plastics_General",
  "Research Topics",
  "Plastic Characterisation_Conducted",
  "Plastic Characterisation_Colour",
  "Plastic Characterisation_Colours Found",
  "Plastic Characterisation_Shape",
  "Plastic Characterisation_Shapes Found",
  "Plastic Characterisation_Polymer",
  "Plastic Characterisation_Polymers Found",
  "Macro_Uses",
  "Macro_Mean Abundance_Count",
  "Macro_Mean Abundance_Weight",
  "Water_Mean Abundance_Count",
  "Water_Mean Abundance_Weight",
  "Shoreline Sediment_Mean Abundance_Count",
  "Shoreline Sediment_Mean Abundance_Weight",
  "Seabed Sediment_Mean Abundance_Count",
  "Seabed Sediment_Mean Abundance_Weight",
  "Mangrove_Mean Abundance_Count",
  "Mangrove_Mean Abundance_Weight",
  "Biota_Mean Abundance_Count",
  "Biota_Mean Abundance_Weight",
  "Degradation indicated",
];

const filters1 = [
  "Survey and monitoring/pollution status",
  " ",
  "Contribution from rivers",
  "Contribution from fisheries/ALDFG",
  "Discharge from offshore infrastructures and shipping",
  "Port reception facilities",
  "Fibreglass-reinforced plastic vessels",
  "Hull scraping and marine coating",
  "Land-based/upstream research/waste management",
  "Differentiation between plastic sources",
  "Movement of plastics in water bodies",
  "Fragmentation and degradation",
  "Accumulation zones and hotspots",
  " ",
  "Ingestion of plastic in the wild",
  "Branchial uptake of plastic in the wild",
  "Entanglement by plastic in the wild",
  "Microbial assemblages",
];

const filters2 = [
  "Experimental studies of physicochemical impacts",
  "Impact on endangered species",
  "Trophic transfer of plastic",
  "Marine plastics as pathways for introduction of alien/non-native/invasive species",
  " ",
  "POP/heavy metal as pollutants from marine plastic debris",
  "Adsorption-desorption of chemicals/pollutants",
  "Plastics as transport vector/medium",
  " ",
  "Human health/ food safety",
  "Economic loss and cost",
  "Social and cultural non-monetary cost and loss",
  "Other socio-economic topics",
  " ",
  "Guidelines, standards and manuals for survey, monitoring and assessment",
  "Data comparability and standardization	•	Methodologies and technologies for research on marine macroplastic",
];

const filters3 = [
  "Methodologies and technologies for research on marine microplastic",
  "New' or 'emerging' technologies for marine plastic",
  "Methodologies and technologies for marine plastic removal and clean-up",
  "Research framework and coordination",
  "Plastic data repositories",
  " ",
  "Legal and regulatory analysis",
  "Action Plans",
  "Compliance and implementation",
  " ",
  "Re-use, recycle and other mitigation measures",
  "Other market-based measures",
  "Social perceptions/Social behavioural studies",
  "Policy",
  " ",
  "Citizen science",
  "Communication and coverage of marine plastic",
  "Language and cultural barrier",
];

const ListGrid = (props) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        marginLeft: "1rem",
        fontSize: "0.95rem",
      }}
    >
      {props?.filters.map((filter, idx) => (
        <Grid key={filter + idx} item xs={11} sm={6} md={props?.md ?? 4}>
          <li>{filter}</li>
        </Grid>
      ))}
    </Grid>
  );
};

export default function Methodology() {
  return (
    <div>
      <SubNav />
      <Container>
        <Body variant="body1" align="justify">
          This section provides information on the development of RRI 2.0 and
          this website. The inventory and metadata can be found&nbsp;
          <Link
            color="secondary"
            href="https://docs.google.com/spreadsheets/d/1yRLGaQk3-9UlopftPr5e8F-X3pKkjwLlZWcTwai6_Ds/edit?usp=sharing"
            target="_blank"
            rel="noreferrer noopener"
          >
            here.
          </Link>
        </Body>
        <HeaderRibbon
          text="Overall Methodology"
          variant="h6"
          color="secondary"
        />
        <SubHeader variant="h6">
          Identification of relevant publications and data extraction
        </SubHeader>

        <Body variant="body1" align="justify">
          The identification of relevant publications and data extraction has
          been carried out by the Singapore-based core team and the extended
          regional team, according to the area of expertise of each researcher.
          Target publications for inclusions are those that relate to any aspect
          of pollution from marine plastics in Southeast and East Asia until
          July 2021; not including publications that would relate solely to the
          production of plastic material and products or the upstream management
          of waste. The RRI 2.0 builds on the publications already captured in
          the previous version of the inventory&nbsp;
          <Link
            color="secondary"
            href="https://docs.google.com/spreadsheets/d/1r4aCVQeCS1cj_Rhip82yVTNNnxkWDgFwbEIHCR_oASk/edit#gid=0"
            target="_blank"
            rel="noreferrer noopener"
          >
            here
          </Link>
          .
          <br />
          <br />
          In RRI 2.0, the inventory was updated to include more recent
          publications, and publications in non-English languages. The search
          for publications was limited to contents which could be found online
          (even if only the abstract). Various keywords were used in numerous
          search engines, including Google Scholar, ScienceDirect, Scopus, and
          ProQuest (see guidance below). Domestic academic collections
          accessible to the regional team were also consulted - this enabled the
          inclusion of relevant research (such as dissertations) conducted in
          the region. Japanese-language papers could not be searched due to the
          lack of a Japanese researcher in the regional team. It is hoped that
          the regional team can be enlarged to new researchers from Japan and
          Korea in order to complete the database, make it more representative
          and improve the accessibility of the papers.
          <br />
          <br />
          RRI 2.0 includes non peer-reviewed publications provided that they
          contain primary research content and/or verifiable data presented with
          rigour so that the metadata fields could be filled reliably. In
          countries where there has been less peer-reviewed publications
          released, non-peer publications can be particularly useful
          substitutes. Furthermore, not all sampling reports lend themselves to
          a research publication whilst being fully relevant to and useful in
          the context of this database. Of note in this context, most of the
          non-English papers that could be found were peer-reviewed.
        </Body>
        <SubHeader variant="h6">Website Development</SubHeader>
        <Body variant="body1" align="justify">
          This website is developed using two open-source libraries: React.js
          and Material UI.
          <br />
          <br />
          All the data is queried directly from the database inventory on Google
          Sheet. The data is then transformed into a format that is easily
          accessible and usable by the website. This approach simplifies the
          development and maintenance needed and facilitates the migration of
          the dataset or the visualisation to a different platform. The website
          content is dynamic and is refreshed everyday.
          <br />
          <br />
          The website codebase is readily available publicly on&nbsp;
          <Link
            color="secondary"
            href="https://github.com/Marine-Litter-Research-Inventory"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </Link>
          .
        </Body>
        <HeaderRibbon
          text="Guidance to the Research Inventory metadata fields"
          variant="h6"
          color="secondary"
        />
        <Body variant="body1" align="justify">
          The metadata input fields are grouped into 4 broad categories, as
          shown below.
          <br />
          The detailed metadata, including the instructions on filling in the
          inventory, can be found&nbsp;
          <Link
            color="secondary"
            href="https://docs.google.com/spreadsheets/d/1yRLGaQk3-9UlopftPr5e8F-X3pKkjwLlZWcTwai6_Ds/edit#gid=751490285"
            target="_blank"
            rel="noreferrer noopener"
          >
            here
          </Link>
          .
        </Body>
        <SubHeader variant="h6">Article Information</SubHeader>
        <Body variant="body1" component="div">
          This first category of input fields capture general information on the
          publication. This includes basic information such as the language of
          the publication, the names of authors, and funding information.
          <br />
          <br />
          <ListGrid filters={articleFilters} />
        </Body>
        <SubHeader variant="h6">Research Scope</SubHeader>
        <Body variant="body1" component="div">
          This second category of input fields captures the different elements
          of research scope. It includes high-level substantive information on
          the research and publication. This enables a better understanding of
          the research, such as whether it is a coastal or offshore study,
          whether it has social/cultural elements, or whether the research
          examined contaminants.
          <br />
          <br />
          <ListGrid filters={researchScopeFilters} />
        </Body>
        <SubHeader variant="h6">Research Methodology</SubHeader>
        <Body variant="body1" component="div">
          This third category of input fields describes the underlying research
          methodology, approach. Where ever possible, technical information on
          the equipment and technology used. This is particularly useful to
          understand capacity needs and elements of data comparability.
          <br />
          <br />
          <ListGrid filters={researchMethdologyFilters} />
          <br />
          Under the input field <b>Methodologies Used</b>, the values for input
          are stated below:
          <br />
          <br />
          <ListGrid filters={methodologiesUsedFilters} />
        </Body>
        <SubHeader variant="h6">Research Findings</SubHeader>
        <Body component="div">
          This fourth category starts with a summary of key findings for each
          publication. Plastic sources (whether implied or traced), counts
          and/or weights are recorded. Where ever possible, the reported average
          values and standard deviations are recorded verbatim.
          <br />
          <br />
          <ListGrid filters={researchFindingsFilters} />
          <br />
          Within the input field <b>Research Topics</b>, the values for input as
          stated below:
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
            <Grid item xs={11} sm={6} md={4}>
              {filters1.map((filter, idx) =>
                filter !== " " ? (
                  <li style={{ margin: "0.5rem 0" }} key={filter + idx}>
                    {filter}
                  </li>
                ) : (
                  <br key={idx} />
                )
              )}
            </Grid>
            <Grid item xs={11} sm={6} md={4}>
              {filters2.map((filter, idx) =>
                filter !== " " ? (
                  <li style={{ margin: "0.5rem 0" }} key={filter + idx}>
                    {filter}
                  </li>
                ) : (
                  <br key={idx + 50} />
                )
              )}
            </Grid>
            <Grid item xs={11} sm={6} md={4}>
              {filters3.map((filter, idx) =>
                filter !== " " ? (
                  <li style={{ margin: "0.5rem 0" }} key={filter + idx}>
                    {filter}
                  </li>
                ) : (
                  <br key={idx + 100} />
                )
              )}
            </Grid>
          </Grid>
        </Body>
      </Container>
    </div>
  );
}
