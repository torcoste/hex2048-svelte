import { isLoadingState } from "./store"

export const getNewCells = async (radius, cells = []) => {
  isLoadingState.update(() => true)
  const response = await fetch(`http://51.15.207.127:13337/${radius}`, {
    method: "POST",
    body: JSON.stringify(cells),
  })
  if (response.status !== 200) return []
  const responseJson = await response.json()
  if (responseJson) isLoadingState.update(() => false)
  return responseJson
}
