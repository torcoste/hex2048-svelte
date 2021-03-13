<script>
  export let radius
  export let cells

  import { getDataCellsArray, getCellDataAttributes } from "../CellsManager"
  import Cell from "./Cell.svelte"
  import GameAreaContainer from "./GameAreaContainer.svelte"

  $: hexagonItemsArray = getDataCellsArray(radius, cells)
</script>

<GameAreaContainer>
  {#each hexagonItemsArray as column, columnIndex}
    {#each column as _, itemIndex}
      <Cell
        type="hexagonItem"
        {radius}
        {columnIndex}
        {itemIndex}
        dataAttributes={getCellDataAttributes(
          radius,
          columnIndex,
          itemIndex,
          cells
        )}
      />
    {/each}
  {/each}
</GameAreaContainer>
