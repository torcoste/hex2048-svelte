<script>
  export let radius
  export let columnIndex
  export let itemIndex
  export let dataAttributes = {}

  export let type = "dataCell" // "dataCell" | "hexagonItem"

  import { getHexagonGridParams } from "../CellsManager"

  $: config = getHexagonGridParams(radius)
</script>

<div
  class={type}
  style="
        width: {config.hexagon.width}vmin;      
        height: {config
    .hexagon.height}vmin;
        left: {config.hexagon.leftShift *
    columnIndex}vmin;
        top: {config.hexagon.getTopShift(
    itemIndex,
    columnIndex
  )}vmin;"
  {...dataAttributes}
>
  <slot />
</div>

<style>
  div.dataCell {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.hexagonItem {
    position: absolute;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 130 114' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M94.6132 5.70835L124.226 57L94.6132 108.292L35.3867 108.292L5.7735 57L35.3867 5.70834L94.6132 5.70835Z' stroke='black' stroke-width='10'/%3E%3C/svg%3E%0A")
      center center no-repeat;
  }
</style>
