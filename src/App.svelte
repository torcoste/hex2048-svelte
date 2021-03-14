<script>
  import ServerUrlSelector from "./components/ServerUrlSelector.svelte"
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import GameStatus from "./components/GameStatus.svelte"
  import Manual from "./components/Manual.svelte"
  import GitHubLink from "./components/GitHubLink.svelte"
  import { resetGame, tryMove, updateGameStatus } from "./GameManager"
  import {
    radiusState,
    cellsState,
    isLoadingState,
    gameStatusState,
    serverUrlState,
  } from "./store"
  import { isMoveKey, isGameAreaVisible } from "./helpers"
  import { DEFAULT_VALUES } from "./constants"

  let radius
  let cells = DEFAULT_VALUES.cells
  let isLoading = DEFAULT_VALUES.isLoading
  let gameStatus = DEFAULT_VALUES.gameStatus
  let serverUrl

  const handleKeydown = ({ key }) => {
    if (isMoveKey(key)) {
      tryMove(radius, isLoading, gameStatus, key, cells, serverUrl)
    }
  }

  radiusState.subscribe((radiusValue) => {
    if (radiusValue && radius !== radiusValue) {
      resetGame(radiusValue, serverUrl)
      radius = radiusValue
    }
  })
  cellsState.subscribe((cellsValue) => {
    if (cellsValue) {
      cells = cellsValue
      updateGameStatus(radius, cellsValue)
    }
  })
  isLoadingState.subscribe((isLoadingValue) => {
    if (isLoading !== isLoadingValue) isLoading = isLoadingValue
  })
  gameStatusState.subscribe((gameStatusValue) => {
    if (gameStatus !== gameStatusValue) gameStatus = gameStatusValue
  })
  serverUrlState.subscribe((serverUrlValue) => {
    if (serverUrlValue && (serverUrl && serverUrl.id) !== serverUrlValue.id) {
      serverUrl = serverUrlValue
      if (radius) resetGame(radius, serverUrlValue)
    }
  })
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <ServerUrlSelector {serverUrl} />
  <RadiusSelect {radius} />
  <GameArea
    isVisible={isGameAreaVisible(radius, gameStatus)}
    {radius}
    {cells}
  />
  <GameStatus {gameStatus} />
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
