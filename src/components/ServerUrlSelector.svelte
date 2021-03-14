<script>
  import { SERVER_URLS } from "../constants"
  import { serverUrlState } from "../store"
  export let serverUrl

  let selected

  $: if (selected && serverUrl.value !== selected)
    serverUrlState.update(() =>
      SERVER_URLS.find((item) => item.value === selected)
    )
</script>

<section>
  <p>Select RNG-server:</p>
  <select bind:value={selected} id="url-server">
    {#each SERVER_URLS as serverItem}
      <option
        selected={serverItem.value === (serverUrl && serverUrl.value)}
        id={serverItem.id}
        value={serverItem.value}>{serverItem.title}</option
      >
    {/each}
  </select>
</section>

<style>
  section {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 300px) {
    section {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    p {
      margin-right: 8px;
    }
  }
</style>
