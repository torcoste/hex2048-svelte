import { writable } from "svelte/store"
import { DEFAULT_VALUES, SERVER_URLS } from "./constants"
import { getRadiusFromUrl } from "./helpers"

export const radiusState = writable(getRadiusFromUrl())
export const cellsState = writable(DEFAULT_VALUES.cells)
export const isLoadingState = writable(DEFAULT_VALUES.isLoading)
export const gameStatusState = writable(DEFAULT_VALUES.gameStatus)
export const serverUrlState = writable(
  !getRadiusFromUrl() ? SERVER_URLS[0] : SERVER_URLS[1]
)
