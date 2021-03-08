export const getNewCells = async (radius, cells = []) => {
  const response = await fetch(`http://51.15.207.127:13337/${radius}`, {
    method: "POST",
    body: JSON.stringify(cells),
  })
  return await response.json()
}
