import React from 'react';
import * as d3 from 'd3';
import WordCloud from "react-d3-cloud";
import {
  Box, InputLabel, MenuItem, FormControl, Select,
  Container
} from '@mui/material';
import {
  getAuthorCount,
  textToJson,
  getFromStorage,
} from 'components/utils/utils';

const Selection = ({ label, choices, setSelection }) => {
  const [location, setLocation] = React.useState('')
  const handleChange = (event) => {
    setLocation(event.target.value)
    setSelection(getAuthorCount(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="selection">{label}</InputLabel>
        <Select
          labelId="selection"
          value={location}
          label={label}
          onChange={handleChange}
        >
          {choices.map((choice, idx) => (
            <MenuItem key={idx} value={choice}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default function WordCloudChart() {
  const [dataSet, setDataSet] = React.useState([])
  const locations = textToJson(getFromStorage('location'))

  console.log(dataSet)

  return (
    <Container maxWidth="md">
      <WordCloud
        data={dataSet.slice(0, 20)}
        font="Arial"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => 30}
        spiral="rectangular"
        // rotate={(word) => [0, 90][Math.floor(Math.random() * 2)]}
        rotate={0}
        padding={6}
        random={Math.random}
        fill={(d, i) => d3.schemeTableau10[i % 10]}
      />
      <Selection
        label="Location/Territory studied"
        choices={locations}
        setSelection={setDataSet}
      />
      <br /><br />
    </Container>
  )
}
