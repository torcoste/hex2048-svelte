<script>
  export let radius

  import {
    GAME_AREA_WIDTH,
    GAME_AREA_HEIGHT,
    HEXAGON_ITEM_ASPECT_RATIO,
  } from "../constants"

  $: columnCount = radius * 2 - 1

  $: hexagonItemsArray = new Array(columnCount).fill(1).map((_, i) => {
    const hexagonItemCount =
      i > radius - 1 ? columnCount + (radius - 1) - i : i + radius
    return new Array(hexagonItemCount).fill(1)
  })

  $: hexagonWidthCountInContainer = (radius + columnCount) / 2

  $: hexagonWidth = GAME_AREA_WIDTH / hexagonWidthCountInContainer
  $: hexagonHeight = hexagonWidth / HEXAGON_ITEM_ASPECT_RATIO

  $: hexagonLeftShift = (GAME_AREA_WIDTH / hexagonWidthCountInContainer) * 0.75

  $: borderWidth =
    0.25 *
    (() =>
      ({
        2: 2.5,
        3: 1.25,
        4: 0.775,
      }[radius] || 0))() // TODO: find out correlation and get rid this
</script>

<div
  class="container"
  style=" width: {GAME_AREA_WIDTH}vmin; height: {GAME_AREA_HEIGHT}vmin"
>
  {#each hexagonItemsArray as column, columnIndex}
    {#each column as _, itemIndex}
      <div
        class="hexagonItem"
        style=" 
    width: {hexagonWidth +
          borderWidth * columnCount}vmin;
    height: {hexagonHeight +
          borderWidth * radius}vmin;
    left: {(hexagonLeftShift -
          borderWidth) *
          columnIndex}vmin;
    top: {(hexagonHeight - borderWidth) * itemIndex +
          (hexagonHeight / 2) * Math.abs(columnIndex - (radius - 1))}vmin;"
      />
    {/each}
  {/each}
</div>

<style>
  div.container {
    position: relative;
  }
  div.hexagonItem {
    position: absolute;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 130 114' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M94.6132 5.70835L124.226 57L94.6132 108.292L35.3867 108.292L5.7735 57L35.3867 5.70834L94.6132 5.70835Z' stroke='black' stroke-width='10'/%3E%3C/svg%3E%0A")
      center center no-repeat;
  }
</style>
