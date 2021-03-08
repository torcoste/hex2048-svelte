<script>
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import Manual from "./components/Manual.svelte"
  import { radiusState, cellsState } from "./store"
  import { getNewCells } from "./service"

  let radius
  let cells = []
  let keyPressed

  function handleKeydown(event) {
    const keyActions = {
      q: () => console.warn("q"),
      w: () => console.warn("w"),
      e: () => console.warn("e"),
      a: () => console.warn("a"),
      s: () => console.warn("s"),
      d: () => console.warn("d"),
    }

    if (keyActions[event.key]) {
      keyActions[event.key]()
      keyPressed = event.key
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
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <RadiusSelect {radius} />
  <GameArea {radius} {keyPressed} {cells} />
  <Manual {radius} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
