<script>
  export let type = "child" // "parent" | "child"
  import { GAME_AREA_HEIGHT, GAME_AREA_WIDTH } from "../constants"
</script>

<div
  class={type}
  style="width: {GAME_AREA_WIDTH}vmin; height: {GAME_AREA_HEIGHT}vmin;"
>
  <slot />
</div>

<style>
  div.child {
    position: absolute;
  }
  div.parent {
    position: relative;
    margin: 16px 0;
  }
</style>
