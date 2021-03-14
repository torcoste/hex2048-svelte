<script>
  export let isVisible
  export let radius
  export let cells

  import { fade } from "svelte/transition"

  import GameAreaContainer from "./GameAreaContainer.svelte"
  import HexagonGrid from "./HexagonGrid.svelte"
  import DataCells from "./DataCells.svelte"
</script>

{#if isVisible}
  <section transition:fade>
    <GameAreaContainer type="parent">
      <DataCells {radius} {cells} />
      <HexagonGrid {radius} {cells} />
    </GameAreaContainer>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
