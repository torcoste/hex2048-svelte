<script>
  import RadiusSelect from "./components/RadiusSelect.svelte"
  import GameArea from "./components/GameArea.svelte"
  import Manual from "./components/Manual.svelte"
  import { radiusState } from "./store"

  let radius
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

  radiusState.subscribe((value) => {
    radius = value
  })
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <RadiusSelect {radius} />
  <GameArea {radius} {keyPressed} />
  <Manual {radius} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
