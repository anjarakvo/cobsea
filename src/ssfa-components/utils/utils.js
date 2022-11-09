import _ from "lodash";

/**
 * Convert from string to json
 * @param {String} text Input string
 * @returns {Object} Json object
 */
export function textToJson(text) {
  return JSON.parse(text)
}

/**
 * Convert from string to json
 * @param {Object} json Input object
 * @returns {String} string
 */
export function jsonToText(json) {
  return JSON.stringify(json)
}

/**
 * Get an item from local storage
 * @param {String} name name of the local storage
 * @returns {any} value of the local storage 
 */
export function getFromStorage(name) {
  return textToJson(localStorage.getItem(name))
}

/**
 * Get an item from local storage
 * @param {String} name name of the local storage
 * @param {any} data data to be store in the local storage
 * @returns {any} value of the local storage 
 */
export function setToStorage(name, data) {
  return localStorage.setItem(name, jsonToText(data))
}

/**
 * Compare two json object together using lodash
 * @param {Object} a json object 1
 * @param {Object} b json object 2
 * @returns {Boolean} true if the json object is equal
 */
export function compareObject(a, b) {
  return _.isEqual(a, b)
}


/**
 * Set the column name as key and the index as value
 * and then save to local storage under "position"
 * can be used to locate position of data in rows.
 */
export function setPositionValue() {
  const data = getFromStorage('data')
  let columns = {}
  data.data.table.cols.forEach((col, idx) => {
    columns[col.label] = idx
  })
  setToStorage('position', columns)
}

/**
 * Take in sovereignt name and retun official long name
 * @param {String} name Name of the sovereignt
 * @returns {String} The official name of the country 
 */
export function countryNameFormatter(name) {
  let countryName = ''
  if (name === "Brunei")
    countryName = "Brunei Darussalam"
  else if (name === "South Korea")
    countryName = "Republic of Korea"
  else if (name === "North Korea")
    countryName = "Democratic People's Republic of Korea"
  else
    countryName = name
  // console.log('countryName:', countryName)
  return countryName
}

export function getAuthorCount(country) {
  const data = textToJson(getFromStorage('data'))
  const position = textToJson(getFromStorage('position'))
  const rows = data.data.table.rows
  const result = {}

  rows.forEach(row => {
    if (row.c[position["Location/Territory studied"]] !== null && row.c[position["Author(s)"]] !== null)
      if (row.c[position["Location/Territory studied"]].v.trim() === country) {
        let list = row.c[position["Author(s)"]].v.trim().split(";")
        list.forEach(raw_author => {
          let author = raw_author.trim()
          if (isNaN(result[author]))
            result[author] = 1
          else
            result[author] += 1
        })
      }
  })

  let out = []
  _.forEach(result, (value, key) => {
    out.push({ value: value, text: key })
  })
  out = _.sortBy(out, (item) => { return item.value }).reverse()

  return out
}