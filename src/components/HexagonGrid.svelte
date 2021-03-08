<script>
  export let radius

  import { GAME_AREA_WIDTH, GAME_AREA_HEIGHT } from "../constants"
  import { getHexagonItemsArray, getHexagonGridParams } from "../helpers"

  $: config = getHexagonGridParams(radius)
  $: hexagonItemsArray = getHexagonItemsArray(radius)
</script>

<div
  class="container"
  style="
  width: {GAME_AREA_WIDTH}vmin; 
  height: {GAME_AREA_HEIGHT}vmin"
>
  {#each hexagonItemsArray as column, columnIndex}
    {#each column as _, itemIndex}
      <div
        class="hexagonItem"
        style="
        width: {config.hexagon
          .width}vmin;      
        height: {config.hexagon
          .height}vmin;
        left: {config.hexagon.leftShift *
          columnIndex}vmin;
        top: {config.hexagon.getTopShift(
          itemIndex,
          columnIndex
        )}vmin;"
      />
    {/each}
  {/each}
</div>

<style>
  div.container {
    position: absolute;
  }
  div.hexagonItem {
    position: absolute;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 130 114' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M94.6132 5.70835L124.226 57L94.6132 108.292L35.3867 108.292L5.7735 57L35.3867 5.70834L94.6132 5.70835Z' stroke='black' stroke-width='10'/%3E%3C/svg%3E%0A")
      center center no-repeat;
  }
</style>
