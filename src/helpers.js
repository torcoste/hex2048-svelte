import {
  AVALIABLE_RADIUS_VALUES,
  dataCellColors,
  GAME_AREA_WIDTH,
  HEXAGON_ITEM_ASPECT_RATIO,
} from "./constants.js"
import { checkStepAvailability } from "./GameManager.js"

export const getRadiusFromUrl = () => {
  const url = document.location.href
  const urlParts = url.split("/#test")
  const radius = urlParts && urlParts[1] && parseInt(urlParts[1])
  if (radius && AVALIABLE_RADIUS_VALUES.includes(radius)) return radius
  return undefined
}

// TODO: that's too much for helpers. Find out better place for Grid/Cells logic

// HexagonGrid

export const getColumnCount = (radius) => radius * 2 - 1

const getHexagonItemCount = (columnIndex, radius, columnCount) =>
  columnIndex > radius - 1
    ? columnCount + (radius - 1) - columnIndex
    : columnIndex + radius

export const getHexagonItemsArray = (radius) =>
  new Array(getColumnCount(radius))
    .fill(1)
    .map((_, columnIndex, columns) =>
      new Array(getHexagonItemCount(columnIndex, radius, columns.length)).fill(
        1
      )
    )

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
  return { fontSize }
}

// Game Status (step availability)

const getCellsCount = (radius) => {
  const sumFromOneToN = (n) => (n * (n + 1)) / 2
  const sumFromNToM = (n, m) => sumFromOneToN(m) - sumFromOneToN(n - 1)
  const maxColumnCount = getColumnCount(radius)
  return sumFromNToM(radius, maxColumnCount - 1) * 2 + maxColumnCount
}

export const isStepAvailable = (radius, cells) => {
  if (!radius) return true

  const isEveryCellFilled = cells.length === getCellsCount(radius)
  if (!isEveryCellFilled) return true

  return checkStepAvailability(radius, cells)
}
