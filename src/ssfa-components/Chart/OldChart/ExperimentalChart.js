import React, { useEffect } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import {
  InputLabel, Select, MenuItem, FormControl,
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';

import { getFromStorage, textToJson } from 'components/utils/utils';
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

const BasicSelector = ({ selectionList, selection, setSelection, label }) => {

  const handleChange = (event) => {
    setSelection(event.target.value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 300, maxWidth: 900, padding: "1rem" }} >
      <InputLabel>{label}</InputLabel>
      <Select
        value={selection}
        label={label}
        onChange={handleChange}
      >
        {selectionList.map((selection, idx) => (
          <MenuItem key={idx} value={selection}>{selection}</MenuItem>
        ))}
      </Select>
    </FormControl >
  )
}

function filterData(filter, inclusive = []) {
  const data = textToJson(getFromStorage("data"))
  const position = textToJson(getFromStorage("position"))
  const rows = data.data.table.rows
  // console.log(rows)

  let res = []
  rows.forEach((row) => {
    let items = row.c[position[filter]].v.split(";")
    items.forEach(item => {
      item = item.trim().toLowerCase()
      if (inclusive.length > 0) {
        inclusive.forEach(inclusiveItem => {
          if (!res.includes(inclusiveItem) && item.includes(inclusiveItem))
            res.push(inclusiveItem)
          else if (!res.includes(item) && !item.includes(inclusiveItem))
            res.push(item)
        })
      } else
        if (!res.includes(item))
          res.push(item)
    })
  })

  // console.log("filterData", res)
  return res
}

function countData(filterList, filter, target, inclusive = []) {
  const data = textToJson(getFromStorage("data"))
  const position = textToJson(getFromStorage("position"))
  const rows = data.data.table.rows

  let res = {}
  filterList.forEach(item => {
    if (inclusive.length > 0) {
      let substitution = ""
      inclusive.forEach(inclusiveItem => {
        substitution = item.includes(inclusiveItem.trim().toLowerCase()) ? inclusiveItem.trim().toLowerCase() : substitution
      })
      res[substitution.length > 0 ? substitution : item] = {}
    }
    else
      res[item] = {}
  })

  // console.log("Initialize data", res)

  rows.forEach(row => {
    row.c[position[filter]].v.split(";").forEach(item => {
      item = item.trim().toLowerCase()
      let substitution = "";
      inclusive.forEach(inclusiveItem => {
        substitution = item.includes(inclusiveItem.trim().toLowerCase()) ? inclusiveItem.trim().toLowerCase() : substitution
      })

      let key = substitution.length > 0 ? substitution : item.trim().toLowerCase()

      let values = row.c[position[target]] !== (undefined || null) ? row.c[position[target]].v.split(";") : ["NA"]
      values.forEach(value => {
        value = value.trim().toLowerCase()
        res[key][value] === undefined ? res[key][value] = 1 : res[key][value] += 1
      })
    })
  })

  // console.log("countData", res)
  return res
}

export default function ExperimentalChart({ filterLabel, filterValue, inclusive, targetList, countLabel, }) {
  const [filterList] = React.useState(filterData(filterValue, inclusive))
  const [filter, setFilter] = React.useState(filterList[0])
  const [target, setTarget] = React.useState(targetList[0])
  // dataSet is an object with format { varX: value }
  const [dataSet, setDataSet] = React.useState({})

  useEffect(() => {
    let dataSet = countData(filterList, filterValue, target, inclusive)
    setDataSet(dataSet[filter])
  }, [filter, target, filterList, filterValue, inclusive])

  let varNames = []
  _.forEach(dataSet, (value, key) => {
    varNames.push(key)
  })

  return (
    <div>
      <ChartComponent
        dataSet={dataSet}
        varX={varNames}
      />
      <div
        style={{
          maxWidth: 900,
          margin: '30px auto',
          textAlign: 'center'
        }}
      >
        <BasicSelector
          label={filterLabel}
          selection={filter}
          setSelection={setFilter}
          selectionList={filterList}
        />
        <BasicSelector
          label={countLabel}
          selection={target}
          setSelection={setTarget}
          selectionList={targetList}
        />
        <CustomTable
          dataSet={dataSet}
          varName={target}
          valueName="Number of paper"
        />
      </div>
    </div>
  )
}