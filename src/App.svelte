<script>
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import Manual from "./components/Manual.svelte"
  import { moveCellsByKeyPressed, MOVE_KEYS_LIST } from "./GameManager"
  import { radiusState, cellsState, isLoadingState } from "./store"
  import { getNewCells } from "./service"
  import { isStepAvailable } from "./helpers"
  import { GAME_STATUSES } from "./constants"

  let radius
  let cells = []
  let isLoading = false
  let gameStatus

  $: isPlaying = gameStatus === GAME_STATUSES.playing

  const handleKeydown = ({ key }) => {
    if (!!radius && !isLoading && isPlaying && MOVE_KEYS_LIST.includes(key)) {
      moveCellsByKeyPressed(key, radius, cells)
    }
  }

  radiusState.subscribe((radiusValue) => {
    if (radiusValue) {
      radius = radiusValue
      gameStatus = GAME_STATUSES.playing
      getNewCells(radiusValue, []).then((cellsValue) =>
        cellsState.update(() => cellsValue)
      )
    }
  })
  cellsState.subscribe((cellsValue) => {
    cells = cellsValue
    if (!isStepAvailable(radius, cellsValue))
      gameStatus = GAME_STATUSES.game_over
  })
  isLoadingState.subscribe((isLoadingValue) => {
    isLoading = isLoadingValue
  })
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <RadiusSelect {radius} />
  <GameArea {radius} {cells} {gameStatus} />
  <Manual {radius} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
