<script>
  import { AVALIABLE_RADIUS_VALUES } from "../constants"
  import { radiusState } from "../store"

  export let radius

  const updateRadius = (radiusValue) => {
    radiusState.update(() => radiusValue)
  }
</script>

<section>
  <p>Select radius:</p>
  {#each AVALIABLE_RADIUS_VALUES as radiusValue}
    <div on:click={() => updateRadius(radiusValue)} class={[radius === radiusValue ? "selected" : ""]}>
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
  }

  .selected {
    background-color: #1c3041;
    color: white;
  }
</style>
