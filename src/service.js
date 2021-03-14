import { GAME_STATUSES } from "./constants"
import { gameStatusState, isLoadingState } from "./store"

export const getNewCells = async (radius, cells, serverUrl) => {
  try {
    isLoadingState.update(() => true)
    const response = await fetch(`${serverUrl.value}/${radius}`, {
      method: "POST",
      body: JSON.stringify(cells),
    })
    if (response) isLoadingState.update(() => false)
    if (response.status !== 200) return []
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
    isLoadingState.update(() => false)
    gameStatusState.update(() => GAME_STATUSES.network_unavailable)
  }
}
