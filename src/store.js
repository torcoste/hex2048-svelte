import { writable } from "svelte/store"
import { getRadiusFromUrl } from "./helpers"

export const radiusState = writable(getRadiusFromUrl())
export const cellsState = writable([])
