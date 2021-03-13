<script>
  import Cell from "./Cell.svelte"

  export let radius
  export let cells = []

  import {
    getCellColor,
    getDataCellsArray,
    getDataCellsParams,
  } from "../CellsManager"
  import GameAreaContainer from "./GameAreaContainer.svelte"

  $: cellsConfig = getDataCellsParams(radius)
  $: dataCellsArray = getDataCellsArray(radius, cells)
</script>

<GameAreaContainer>
  {#each dataCellsArray as column, columnIndex}
    {#each column as item, itemIndex}
      {#if item}
        <Cell {radius} {columnIndex} {itemIndex}>
          <svg
            viewBox="0 0 130 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="margin: {cellsConfig.margin}vmin;"
          >
            <path
              d="M130 57L97.5 113.292L32.5 113.292L-2.84124e-06 57L32.5 0.708349L97.5 0.708352L130 57Z"
              fill={getCellColor(item)}
            />
          </svg>
          <span style="font-size: {cellsConfig.fontSize}vmin">
            {item}
          </span>
        </Cell>
      {/if}
    {/each}
  {/each}
</GameAreaContainer>

<style>
  span {
    position: absolute;
  }
</style>
