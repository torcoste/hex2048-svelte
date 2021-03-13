import { writable } from "svelte/store"
import { DEFAULT_VALUES } from "./constants"
import { getRadiusFromUrl } from "./helpers"

export const radiusState = writable(getRadiusFromUrl())
export const cellsState = writable(DEFAULT_VALUES.cells)
export const isLoadingState = writable(DEFAULT_VALUES.isLoading)
export const gameStatusState = writable(DEFAULT_VALUES.gameStatus)
