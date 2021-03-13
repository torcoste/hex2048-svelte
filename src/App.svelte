<script>
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import Manual from "./components/Manual.svelte"
  import { resetGame, tryMove, updateGameStatus } from "./GameManager"
  import {
    radiusState,
    cellsState,
    isLoadingState,
    gameStatusState,
  } from "./store"
  import { isMoveKey } from "./helpers"
  import { DEFAULT_VALUES } from "./constants"
import GitHubLink from "./components/GitHubLink.svelte"

  let radius
  let cells = DEFAULT_VALUES.cells
  let isLoading = DEFAULT_VALUES.isLoading
  let gameStatus = DEFAULT_VALUES.gameStatus

  const handleKeydown = ({ key }) => {
    if (isMoveKey(key)) {
      tryMove(radius, isLoading, gameStatus, key, cells)
    }
  }

  radiusState.subscribe((radiusValue) => {
    if (radiusValue) {
      radius = radiusValue
      resetGame(radiusValue)
    }
  })
  cellsState.subscribe((cellsValue) => {
    cells = cellsValue
    updateGameStatus(radius, cellsValue)
  })
  isLoadingState.subscribe((isLoadingValue) => {
    isLoading = isLoadingValue
  })
  gameStatusState.subscribe((gameStatusValue) => {
    gameStatus = gameStatusValue
  })
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <RadiusSelect {radius} />
  <GameArea {radius} {cells} {gameStatus} />
  <Manual {radius} />
  <GitHubLink />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
