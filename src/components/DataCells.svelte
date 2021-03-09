<script>
  export let radius
  export let cells = []

  import { GAME_AREA_WIDTH, GAME_AREA_HEIGHT } from "../constants"
  import {
    getCellColor,
    getDataCellsArray,
    getDataCellsParams,
    getHexagonGridParams,
  } from "../helpers"

  $: config = getHexagonGridParams(radius)
  $: cellsConfig = getDataCellsParams(radius)
  $: hexagonItemsArray = getDataCellsArray(radius, cells)
</script>

<div
  class="container"
  style=" width: {GAME_AREA_WIDTH}vmin; height: {GAME_AREA_HEIGHT}vmin"
>
  {#each hexagonItemsArray as column, columnIndex}
    {#each column as item, itemIndex}
      {#if item}
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
        >
          <svg
            viewBox="0 0 130 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="margin: {config.hexagon.borderWidth * 3}vmin;"
          >
            <path
              d="M130 57L97.5 113.292L32.5 113.292L-2.84124e-06 57L32.5 0.708349L97.5 0.708352L130 57Z"
              fill={getCellColor(item)}
            />
          </svg>
          <span style="font-size: {cellsConfig.fontSize}vmin">
            {item}
          </span>
        </div>
      {/if}
    {/each}
  {/each}
</div>

<style>
  div.container {
    position: absolute;
  }
  div.hexagonItem {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    position: absolute;
  }
</style>
