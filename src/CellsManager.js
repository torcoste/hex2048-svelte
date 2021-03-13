// TODO: Find out better filename. Controller?

import {
  dataCellColors,
  GAME_AREA_WIDTH,
  HEXAGON_ITEM_ASPECT_RATIO,
} from "./constants.js"

// HexagonGrid

export const getColumnCount = (radius) => radius * 2 - 1

const getHexagonItemCount = (columnIndex, radius, columnCount) =>
  columnIndex > radius - 1
    ? columnCount + (radius - 1) - columnIndex
    : columnIndex + radius

const getHexagonWidthCountInContainer = (radius) =>
  (radius + getColumnCount(radius)) / 2

const getHexagonItemWidth = (radius) =>
  GAME_AREA_WIDTH / getHexagonWidthCountInContainer(radius)

const getHexagonItemBorderWidth = (radius) =>
  0.25 *
  (() =>
    ({
      2: 2.5,
      3: 1.25,
      4: 0.775,
      5: 0.5,
      6: 0.35,
      7: 0.235,
      8: 0.2,
      9: 0.159, // TODO: find out correlation and get rid this magic numbers
    }[radius] || 0))()

export const getHexagonGridParams = (radius) => {
  const columnCount = getColumnCount(radius)
  const borderWidth = getHexagonItemBorderWidth(radius)
  const rawWidth = getHexagonItemWidth(radius)
  const width = rawWidth + borderWidth * columnCount
  const rawHeight = rawWidth / HEXAGON_ITEM_ASPECT_RATIO
  const height = rawHeight + borderWidth * radius
  const leftShift = rawWidth * 0.75 - borderWidth
  const getTopShift = (itemIndex, columnIndex) =>
    (rawHeight - borderWidth) * itemIndex +
    (rawHeight / 2) * Math.abs(columnIndex - (radius - 1))
  return {
    columnCount,
    hexagon: { width, height, leftShift, borderWidth, getTopShift },
  }
}

// DataCells

export const getCellColor = (value) => dataCellColors[value] || "#FFF"

const getCellCoords = (radius, columnIndex, itemIndex) => ({
  x: columnIndex - (radius - 1),
  y:
    columnIndex < radius
      ? radius - 1 - itemIndex
      : radius - 1 - (itemIndex + (columnIndex - radius + 1)),
  z:
    columnIndex < radius
      ? -(columnIndex - itemIndex)
      : -(columnIndex - (itemIndex + (columnIndex - radius + 1))),
})

export const getCellDataAttributes = (
  radius,
  columnIndex,
  itemIndex,
  cells = []
) => {
  const { x, y, z } = getCellCoords(radius, columnIndex, itemIndex)
  const cellData = cells.find(
    (cell) => cell.x === x && cell.y === y && cell.z === z
  )
  const value = cellData ? cellData.value : 0
  return {
    "data-x": x,
    "data-y": y,
    "data-z": z,
    "data-value": value,
  }
}

export const getDataCellsArray = (radius, cells = []) =>
  new Array(getColumnCount(radius)).fill(null).map((_, columnIndex, columns) =>
    new Array(getHexagonItemCount(columnIndex, radius, columns.length))
      .fill(null)
      .map((_, itemIndex) => {
        const coords = getCellCoords(radius, columnIndex, itemIndex)
        const cellData = cells.find(
          (cell) =>
            cell.x === coords.x && cell.y === coords.y && cell.z === coords.z
        )
        return cellData && cellData.value
      })
  )

const getCellValueFontSize = (radius) => Math.max(6.2 - radius, 1)

export const getDataCellsParams = (radius) => {
  const fontSize = getCellValueFontSize(radius)
  const margin = getHexagonItemBorderWidth(radius) * 3
  return { fontSize, margin }
}
