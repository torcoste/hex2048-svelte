<script>
  export let radius
  export let cells

  import { fade } from "svelte/transition"

  import GameAreaContainer from "./GameAreaContainer.svelte"
  import HexagonGrid from "./HexagonGrid.svelte"
  import DataCells from "./DataCells.svelte"
  import GameStatus from "./GameStatus.svelte"
</script>

{#if radius}
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
