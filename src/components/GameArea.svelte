<script>
  import { fade } from "svelte/transition"
  import GameStatus from "./GameStatus.svelte"

  export let radius
  export let keyPressed
</script>

{#if radius}
  <section transition:fade>
    <p>GameArea</p>
    {#if keyPressed}
      <p>Key pressed: {keyPressed}</p>
    {/if}
    <GameStatus />
  </section>
{/if}

<style>
</style>
