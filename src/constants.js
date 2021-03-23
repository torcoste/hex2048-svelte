export const SERVER_URL =
  "//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud"

export const AVALIABLE_RADIUS_VALUES = [2, 3, 4, 5, 6, 7, 8, 9]

export const MOVE_KEYS_LIST = [81, 87, 69, 65, 83, 68] // ["q", "w", "e", "a", "s", "d"]

export const MOVE_DIRECTIONS = {
  top: "top",
  top_right: "top-right",
  top_left: "top-left",
  bottom: "bottom",
  bottom_right: "bottom-right",
  bottom_left: "bottom-left",
}

export const keyMoveDict = {
  [MOVE_KEYS_LIST[0]]: MOVE_DIRECTIONS.top_left,
  [MOVE_KEYS_LIST[1]]: MOVE_DIRECTIONS.top,
  [MOVE_KEYS_LIST[2]]: MOVE_DIRECTIONS.top_right,
  [MOVE_KEYS_LIST[3]]: MOVE_DIRECTIONS.bottom_left,
  [MOVE_KEYS_LIST[4]]: MOVE_DIRECTIONS.bottom,
  [MOVE_KEYS_LIST[5]]: MOVE_DIRECTIONS.bottom_right,
}

export const moveConfigDict = {
  [MOVE_DIRECTIONS.top]: { axis: "x", directAxis: "y" },
  [MOVE_DIRECTIONS.bottom]: { axis: "x", directAxis: "z" },
  [MOVE_DIRECTIONS.top_right]: { axis: "y", directAxis: "x" },
  [MOVE_DIRECTIONS.bottom_left]: { axis: "y", directAxis: "z" },
  [MOVE_DIRECTIONS.top_left]: { axis: "z", directAxis: "y" },
  [MOVE_DIRECTIONS.bottom_right]: { axis: "z", directAxis: "x" },
}

export const SERVER_URLS = [
  {
    id: "remote",
    value: "//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud",
    title: "Remote server",
  },
  {
    id: "localhost",
    value: "http://localhost:13337",
    title: "Local server",
  },
]

export const GAME_STATUSES = {
  playing: "playing",
  game_over: "game-over",
  round_select: "round-select",
  network_unavailable: "network-unavailable",
}

export const DEFAULT_VALUES = {
  cells: [],
  isLoading: false,
  gameStatus: GAME_STATUSES.round_select,
}

export const colors = {
  maximum_blue_purple: "#B2ABF2",
  claret: "#89043D",
  turquoise: "#2FE6DE",
  gunmetal: "#1C3041",
  sea_green_crayola: "18F2B2",
}

// all sizes in vim (mininal of vh/vw)
export const GAME_AREA_WIDTH = 60
export const GAME_AREA_HEIGHT = 66.5
export const HEXAGON_ITEM_ASPECT_RATIO = 130 / 114

export const HEXAGON_ITEM_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 130 114' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M94.6132 5.70835L124.226 57L94.6132 108.292L35.3867 108.292L5.7735 57L35.3867 5.70834L94.6132 5.70835Z' stroke='black' stroke-width='10'/%3E%3C/svg%3E%0A"

export const dataCellColors = {
  2: "rgb(238, 228, 218)",
  4: "rgb(237, 224, 200)",
  8: "rgb(242, 177, 121)",
  16: "rgb(245, 149, 99)",
  32: "rgb(246, 124, 95)",
  64: "rgb(246, 94, 59)",
  128: "rgb(237, 207, 114)",
  256: "rgb(237, 204, 97)",
  512: "rgb(237, 200, 80)",
  1024: "rgb(237, 197, 63)",
  2048: "rgb(237, 194, 46)",
  4096: "red", // TODO: define more colors
  8192: "red",
}
