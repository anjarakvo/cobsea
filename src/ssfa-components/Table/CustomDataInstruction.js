import { Link } from '@mui/material';
import StyledLink from 'components/StyledComponents/StyledLink';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFromStorage } from 'components/utils/utils';
import { CSVLink } from "react-csv";

function dataFormatting() {
  let data = getFromStorage('data')
  let position = getFromStorage('position')
  let rows = data.data.table.rows
  let exp = []
  rows.forEach(item => {
    let row = item.c
    let temp = {}
    for (const key in position) {
      temp[key] = row[position[key]]?.v
    }
    exp.push(temp)
  })
  return exp
}

const lists = [
  <><b>Columns displayed:</b> Choose which data columns to display in the table, using the COLUMN button at the top left corner of the table. You can also hide each column using the options menu on the right of each column header when hover the cursor over.</>,
  <><b>Column order:</b> Change the order of the data columns by dragging and dropping the column headers in the left-hand side menu bar.</>,
  <><b>Sorting of rows:</b> The order of data rows can be rearranged through sorting in a data column, in ascending or descending order. You can do this by hovering the cursor over and clicking the arrow in the relevant column headers. The sorting option can also be found in the options menu on the right of each column header.</>,
  <><b>Filtering within columns:</b> Apply filters to specific columns, which will then select for certain rows to be displayed. You can only apply one filter to one column at any time. The FILTER button can be found at the top left corner of the table.</>,
  <><b>Export:</b> Download the table as displayed on your screen, using the EXPORT button, at the top left corner of the table.</>,
]

export default function CustomDataInstruction() {

  const exportedData = React.useMemo(() => dataFormatting(), [])
  const { databaseLink } = useSelector(state => state.dataExtraction)

  return (
    <>
      Customise and explore the data captured in RRI 2.0  within, and about, marine plastic in Southeast and East Asia.
      < br /> <br />
      {
        lists.map((list, idx) => (
          <li key={idx} style={{ listStyle: "number", marginLeft: "2rem", marginBottom: "1rem" }}>{list}</li>
        ))
      }
      The inventory RRI 2.0 can be accessed&nbsp;
      <Link
        href={databaseLink}
        target="_blank"
        rel="noreferrer noopener"
        sx={{
          color: theme => theme.palette.secondary.main,
          fontWeight: 'bold',
        }}
      >
        here
      </Link>
      &nbsp;or download the data as a CSV file&nbsp;
      <CSVLink
        data={exportedData}
        filename="rri-2.0-data.csv"
        target="_blank"
        style={{
          fontWeight: 'bold',
          color: "#9c4a55",
        }}
      >
        here
      </CSVLink>
      . A description of the metadata fields can be found in&nbsp;
      <StyledLink to="/data/methodology-and-ontology">
        Methodology and Ontology
      </StyledLink>.
    </>
  )
}