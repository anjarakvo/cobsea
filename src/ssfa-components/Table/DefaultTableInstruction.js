import StyledLink from 'components/StyledComponents/StyledLink';
import React from 'react';

const lists = [
  <><b>Columns displayed:</b> Choose which data columns to display in the table, using the COLUMN button at the top left corner of the table. You can also hide each column using the options menu on the right of each column header when hover the cursor over.</>,
  <><b>Filtering within columns:</b> Apply filters to specific columns, which will then select for certain rows to be displayed. You can only apply one filter to one column at any time. The FILTER button can be found at the top left corner of the table.</>,
  <><b>Export:</b> Download the table as displayed on your screen, using the EXPORT button, at the top left corner of the table.</>,
  <><b>Sorting of rows:</b> The order of data rows can be rearranged through sorting in a data column, in ascending or descending order. You can do this by hovering the cursor over and clicking the arrow in the relevant column headers. The sorting option can also be found in the options menu on the right of each column header.</>,
]

export default function DefaultTableInstruction() {

  return (
    <>
      This table displays the aims of research and research findings of each humanities publication. The webpage link and inventory ID of each article can be found in the last columns, which can be used as a reference number to look for the article in the main inventory.
      < br /> <br />
      {
        lists.map((list, idx) => (
          <li key={idx} style={{ listStyle: "number", marginLeft: "2rem", marginBottom: "1rem" }}>{list}</li>
        ))
      }
      Reviewing the research topics: You can select for any of the following research topics that the authors have focused on, using the filter function. Visit the Guidance to the Research Inventory metadata fields in&nbsp;
      <StyledLink to="/data/methodology-and-ontology">
        Methodology and Ontology
      </StyledLink>.
      &nbsp;for more information on each research topic.
    </>
  )
}