import React, { useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import {
  InputLabel, Select, MenuItem, OutlinedInput, Checkbox, FormControl, TextField,
  Chip, Box, Button,
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';

import { getQuantity } from 'components/utils/utils';
import useWindowDimensions from 'components/utils/useWindowDimensions';

const ChartComponent = ({ varX, dataSet }) => {
  const [windowWidth, windowHeight] = useWindowDimensions();

  useEffect(() => {
    let data = []
    _.forEach(dataSet, (value, key) => {
      if (varX.includes(key))
        data.push({ Country: key, Value: value })
    })
    data = _.sortBy(data, "Value").reverse()

    d3.select("#my_dataviz").selectChildren().remove()

    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      const value = d.Value
      tooltip
        .html(value)
        .style('position', 'absolute')
        .style("opacity", 1)

    }
    const mousemove = function (event, d) {
      tooltip.style("transform", "translateY(-55%)")
        .style("left", (event.x) + 10 + "px")
        .style("top", (event.y) + "px")
    }
    const mouseleave = function (event, d) {
      tooltip
        .style("opacity", 0)
    }

    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = window.innerWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.Country))
      .padding(0.2);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return +d.Value })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.Country))
      .attr("y", d => y(d.Value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(0))
      .attr("y", d => y(0))
      .attr("fill", "#69b3a2")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    // Animation
    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", d => y(d.Value))
      .attr("height", d => height - y(d.Value))
      .delay((d, i) => { return i * 100 })

  }, [windowWidth, windowHeight, varX, dataSet])

  return (
    <div id="my_dataviz" />
  )
}

const DataSelector = ({ varX, setVarX, varNames, label }) => {

  const handleChange = (event) => {
    const { target: { value } } = event
    setVarX(typeof value === 'string' ? value.split(",") : value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 300, maxWidth: 900, padding: "1rem" }}>
      <InputLabel id="selector-label" sx={{ fontSize: 20 }}>{label}</InputLabel>
      <Select
        labelId="selector-label"
        multiple
        value={varX}
        onChange={handleChange}
        input={<OutlinedInput sx={{ fontSize: 20 }} label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {selected.map((value) => (
              <Chip color="primary" key={value} label={value} sx={{ m: '2px' }} />
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "35%",
              width: "100%"
            },
          },
        }}
      >
        {varNames.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            <Checkbox checked={varX.indexOf(name) > -1} />
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const DurationSelector = ({ duration, setDuration }) => {
  const [form, setForm] = React.useState(duration)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: Number(value)
    })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setDuration(form)
        console.log('form:', form)
      }}
    >
      <FormControl
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TextField
          label="From"
          name="start"
          variant="outlined"
          onChange={handleChange}
          sx={{ width: 120, margin: "1rem" }}
        />
        <TextField
          label="To"
          name="end"
          variant="outlined"
          onChange={handleChange}
          sx={{ width: 120, margin: "1rem" }}
        />
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
      >
        Search
      </Button>
    </form>
  )
}

const CustomTable = ({ dataSet, varName, valueName }) => {
  function formatData(name, value) {
    return { name, value }
  }

  let rows = []
  _.forEach(dataSet, (value, key) => {
    rows.push(formatData(key, value))
  })
  rows = _.sortBy(rows, ["value"]).reverse()

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: '#6FBFF5',
        width: '95%',
        margin: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#2196f3' }}>
            <TableCell align="center" style={{ color: 'ghostWhite' }}>{varName}</TableCell>
            <TableCell align="center" style={{ color: 'ghostWhite' }}>{valueName}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function BarChart({ selectorLabel }) {
  const [duration, setDuration] = React.useState({ start: 2000, end: 3000 })
  const [dataSet, setDataSet] = React.useState(getQuantity(2000, 3000))

  useEffect(() => {
    setDataSet(getQuantity(duration.start, duration.end))
    // setDataSet(getQuantity(2001, 2001))
  }, [duration])

  let varNames = []
  _.forEach(dataSet, (value, key) => {
    varNames.push(key)
  })
  varNames = varNames.sort()

  const [varX, setVarX] = React.useState(varNames)

  return (
    <div>
      <ChartComponent
        dataSet={dataSet}
        varX={varX}
      />
      <div
        style={{
          maxWidth: 900,
          margin: '30px auto',
          textAlign: 'center'
        }}
      >
        <DurationSelector
          duration={duration}
          setDuration={setDuration}
        />
        <br />
        <DataSelector
          label={selectorLabel}
          varNames={varNames}
          varX={varX}
          setVarX={setVarX}
        />
        <CustomTable
          dataSet={dataSet}
          varName="Country"
          valueName="Number of paper"
        />
      </div>
    </div>
  )
}