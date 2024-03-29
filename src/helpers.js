import {
  AVALIABLE_RADIUS_VALUES,
  GAME_STATUSES,
  MOVE_KEYS_LIST,
} from "./constants.js"

export const getRadiusFromUrl = () => {
  const url = document.location.href
  const urlParts = url.split("/#test")
  const radius = urlParts && urlParts[1] && parseInt(urlParts[1])
  if (radius && AVALIABLE_RADIUS_VALUES.includes(radius)) return radius
  return undefined
}

export const isMoveKey = (keyCode) => MOVE_KEYS_LIST.includes(keyCode)

/**
 * @param {string} moveAxis "x", "y" or "z"
 * @param {string} directAxis "x", "y" or "z" differ from moveAxis
 * @returns "x", "y" or "z" differ from moveAxis and directAxis
 */
export const getThirdAxis = (moveAxis, directAxis) =>
  ["x", "y", "z"].find((axis) => axis !== moveAxis && axis !== directAxis)

export const isGameAreaVisible = (radius, gameStatus) =>
  radius && gameStatus !== GAME_STATUSES.network_unavailable

// log

export const logCellsMovement = (direction) => {
  console.log(
    `Cells moved in %c${direction}%c direction`,
    "color:red; font-weight: bold;",
    ""
  )
}

export const logNewCells = (newCells) => {
  console.log(
    `%cNew cells: %c${JSON.stringify(newCells)}`,
    "color:violet; font-weight: bold;",
    ""
  )
}
