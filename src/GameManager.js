import {
  DEFAULT_VALUES,
  GAME_STATUSES,
  keyMoveDict,
  moveConfigDict,
  MOVE_DIRECTIONS,
} from "./constants"
import { getColumnCount } from "./CellsManager"
import { cellsState, gameStatusState, isLoadingState } from "./store"
import { getNewCells } from "./service"
import { getThirdAxis, logCellsMovement, logNewCells } from "./helpers"
import { pipe } from "./utils"

export const resetGame = (radius, serverUrl) => {
  gameStatusState.update(() => GAME_STATUSES.playing)
  cellsState.update(() => DEFAULT_VALUES.cells)
  addNewCells(radius, [], serverUrl)
}

// TODO: make it with async/await instead of setTimeout
const addNewCells = (radius, cells, serverUrl) => {
  setTimeout(() => {
    isLoadingState.update(() => true)
    getNewCells(radius, cells, serverUrl)
      .then((cellsValue) => {
        logNewCells(cellsValue)
        cellsState.update(() => [...cells, ...cellsValue])
      })
      .finally(() => {
        isLoadingState.update(() => false)
      })
  }, 150)
}

export const tryMove = (
  radius,
  isLoading,
  gameStatus,
  keyCode,
  cells,
  serverUrl
) => {
  const isPlaying = gameStatus === GAME_STATUSES.playing
  if (!!radius && !isLoading && isPlaying) {
    moveCells(keyMoveDict[keyCode], radius, cells, serverUrl)
  }
}

export const updateGameStatus = (radius, cells) => {
  if (!radius || !cells) return
  if (!isStepAvailable(radius, cells))
    gameStatusState.update(() => GAME_STATUSES.game_over)
}

// Move Cells ("step")

const groupCellsByDirectionAxis = (direction, radius, cells) => {
  const { axis, directAxis } = moveConfigDict[direction]
  return new Array(getColumnCount(radius))
    .fill([])
    .map((_, index) =>
      cells
        .filter((cell) => cell[axis] === index - (radius - 1))
        .sort((a, b) => b[directAxis] - a[directAxis])
    )
}

const tryMergeCells = (cellsGroupedByDirectionAxis) =>
  cellsGroupedByDirectionAxis
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

const tryShiftCells = (radius, direction) => (cellsGroupedByDirectionAxis) => {
  const { axis, directAxis } = moveConfigDict[direction]
  return cellsGroupedByDirectionAxis.map((cell, index) => {
    const moveAxisValue = cell[axis]
    const directAxisValue = radius - 1 - Math.max(moveAxisValue, 0) - index
    return {
      ...cell,
      [directAxis]: directAxisValue,
      [getThirdAxis(axis, directAxis)]: -(moveAxisValue + directAxisValue),
    }
  })
}

const moveCells = async (direction, radius, cells, serverUrl) => {
  const movedCells = groupCellsByDirectionAxis(direction, radius, cells)
    .map((line) => pipe(tryMergeCells, tryShiftCells(radius, direction))(line))
    .flat()
  const needToRerender = !isCellsArraysEqual(cells, movedCells)
  if (!needToRerender) return
  cellsState.update(() => movedCells)
  logCellsMovement(direction)
  addNewCells(radius, movedCells, serverUrl)
}

// Game Status update

const groupCellsByEveryDirectionAxis = (radius, cells) => {
  return [
    MOVE_DIRECTIONS.top,
    MOVE_DIRECTIONS.top_right,
    MOVE_DIRECTIONS.top_left,
  ].map((direction) => groupCellsByDirectionAxis(direction, radius, cells))
}

const checkStepAvailability = (radius, cells) =>
  groupCellsByEveryDirectionAxis(radius, cells)
    .map((direction) =>
      direction
        .map((axis) =>
          axis.some(
            (cell, cellIndex, axisArray) =>
              cellIndex && cell.value === axisArray[cellIndex - 1].value
          )
        )
        .some((direcionAvaliableSteps) => direcionAvaliableSteps)
    )
    .some((direcionsAvaliableSteps) => direcionsAvaliableSteps)

// Game Status (step availability)

const getCellsCount = (radius) => {
  const sumFromOneToN = (n) => (n * (n + 1)) / 2
  const sumFromNToM = (n, m) => sumFromOneToN(m) - sumFromOneToN(n - 1)
  const maxColumnCount = getColumnCount(radius)
  return sumFromNToM(radius, maxColumnCount - 1) * 2 + maxColumnCount
}

const isEveryCellFilled = (radius, cells) =>
  cells.length === getCellsCount(radius)

const isStepAvailable = (radius, cells) => {
  if (!radius || !cells.length) return true
  if (!isEveryCellFilled(radius, cells)) return true

  return checkStepAvailability(radius, cells)
}

// cells comparing

const stringifyCell = (cell) => `${cell.x};${cell.y};${cell.z};${cell.value}`

const stringifyCellsArray = (cellsArray) => cellsArray.map(stringifyCell)

const isStringifiedCellsArraysEqual = (original, moved) => {
  if (original.length !== moved.length) return false
  return original.every((cell) => moved.includes(cell))
}

const isCellsArraysEqual = (original, moved) =>
  isStringifiedCellsArraysEqual(
    stringifyCellsArray(original),
    stringifyCellsArray(moved)
  )
