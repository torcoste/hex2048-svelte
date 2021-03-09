import { getColumnCount } from "./helpers"
import { getNewCells } from "./service"
import { cellsState } from "./store"

const MOVE_DIRECTIONS = {
  top: "top",
  top_right: "top-right",
  top_left: "top-left",
  bottom: "bottom",
  bottom_right: "bottom-right",
  bottom_left: "bottom-left",
}

export const MOVE_KEYS_LIST = ["q", "w", "e", "a", "s", "d"]

const keyMoveDict = {
  q: MOVE_DIRECTIONS.top_left,
  w: MOVE_DIRECTIONS.top,
  e: MOVE_DIRECTIONS.top_right,
  a: MOVE_DIRECTIONS.bottom_left,
  s: MOVE_DIRECTIONS.bottom,
  d: MOVE_DIRECTIONS.bottom_right,
}

const moveConfigDict = {
  [MOVE_DIRECTIONS.top]: { axis: "x", directAxis: "y" },
  [MOVE_DIRECTIONS.bottom]: { axis: "x", directAxis: "z" },
  [MOVE_DIRECTIONS.top_right]: { axis: "y", directAxis: "x" },
  [MOVE_DIRECTIONS.bottom_left]: { axis: "y", directAxis: "z" },
  [MOVE_DIRECTIONS.top_left]: { axis: "z", directAxis: "y" },
  [MOVE_DIRECTIONS.bottom_right]: { axis: "z", directAxis: "x" },
}

const getThirdAxis = (moveAxis, directAxis) =>
  ["x", "y", "z"].find((axis) => axis !== moveAxis && axis !== directAxis)

const moveCells = async (direction, radius, cells) => {
  const columnCount = getColumnCount(radius)

  const { axis, directAxis } = moveConfigDict[direction]

  const array = new Array(columnCount).fill([]).map((_, index) =>
    cells
      .filter((cell) => cell[axis] === index - (radius - 1))
      .sort((a, b) => b[directAxis] - a[directAxis])
      .reduce(
        (acc, cur) =>
          acc.length && acc[acc.length - 1].value === cur.value
            ? [
                ...acc.slice(0, acc.length - 1),
                { ...acc[acc.length - 1], value: cur.value * 2 },
                { ...cur, value: 0 },
              ]
            : [...acc, cur],
        []
      )
      .reduce((acc, cur) => (!!cur.value ? [...acc, cur] : acc), [])
      .map((cell, index) => {
        const moveAxisValue = cell[axis]
        const directAxisValue =
          radius - 1 - (moveAxisValue > 0 ? moveAxisValue : 0) - index
        return {
          ...cell,
          [directAxis]: directAxisValue,
          [getThirdAxis(axis, directAxis)]: -(moveAxisValue + directAxisValue),
        }
      })
  )

  const movedCells = array.flat()
  const newCells = await getNewCells(radius, movedCells)
  cellsState.update(() => [...movedCells, ...newCells])
}

export const moveCellsByKeyPressed = (key, radius, cells) =>
  moveCells(keyMoveDict[key], radius, cells)
