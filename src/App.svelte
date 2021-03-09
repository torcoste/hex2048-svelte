<script>
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import Manual from "./components/Manual.svelte"
  import { moveCellsByKeyPressed, MOVE_KEYS_LIST } from "./GameManager"
  import { radiusState, cellsState, isLoadingState } from "./store"
  import { getNewCells } from "./service"

  let radius
  let cells = []
  let isLoading = false

  const handleKeydown = ({ key }) => {
    if (!!radius && !isLoading && MOVE_KEYS_LIST.includes(key)) {
      moveCellsByKeyPressed(key, radius, cells)
    }
  }

  radiusState.subscribe((radiusValue) => {
    if (radiusValue) {
      radius = radiusValue
      getNewCells(radiusValue, []).then((cellsValue) =>
        cellsState.update(() => cellsValue)
      )
    }
  })
  cellsState.subscribe((value) => {
    cells = value
  })
  isLoadingState.subscribe((isLoadingValue) => {
    isLoading = isLoadingValue
  })
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <RadiusSelect {radius} />
  <GameArea {radius} {cells} />
  <Manual {radius} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
