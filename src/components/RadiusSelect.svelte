<script>
  import { AVALIABLE_RADIUS_VALUES } from "../constants"
  import { getNewCells } from "../service"
  import { cellsState, radiusState } from "../store"

  export let radius

  const updateRadius = (radiusValue) => {
    radiusState.update(() => radiusValue)
    getNewCells(radiusValue, []).then((value) => cellsState.update(() => value))
  }
</script>

<section>
  <p>Select radius:</p>
  {#each AVALIABLE_RADIUS_VALUES as radiusValue}
    <div
      on:click={() => updateRadius(radiusValue)}
      class={radius === radiusValue && "selected"}
    >
      <p>{radiusValue}</p>
    </div>
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #18f2b2;
    padding: 16px;
    border-radius: 16px;
  }
  div {
    background-color: #b2abf2;
    margin: 0 8px;
    flex: auto;
    border-radius: 16px;
    color: white;
    max-width: 64px;
    align-items: center;
  }
  .selected {
    background-color: #1c3041;
    color: white;
  }
  @media (max-width: 300px) {
    section {
      flex-direction: column;
      align-items: center;
      padding: 8px;
    }
    div {
      margin: 4px 0;
      padding: 0 32px;
    }
  }
</style>
