<script>
  export let radius
  export let cells
  export let keyPressed

  import { fade } from "svelte/transition"

  import { GAME_AREA_HEIGHT, GAME_AREA_WIDTH } from "../constants"

  import GameStatus from "./GameStatus.svelte"
  import HexagonGrid from "./HexagonGrid.svelte"
  import DataCells from "./DataCells.svelte"
</script>

{#if radius}
  <section transition:fade>
    <div
      class="gameArea"
      style="width: {GAME_AREA_WIDTH}vmin; height: {GAME_AREA_HEIGHT}vmin;"
    >
      <DataCells {radius} {cells} />
      <HexagonGrid {radius} />
    </div>

    {#if keyPressed}
      <p>Key pressed: {keyPressed}</p>
    {/if}
    <GameStatus />
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div.gameArea {
    position: relative;
    margin: 16px 0;
  }
</style>
