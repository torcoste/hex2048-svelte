<script>
  export let gameStatus
</script>

<div>
  <p>Game Status: <span data-status={gameStatus}>{gameStatus}</span></p>
</div>

<style>
  span {
    font-weight: bold;
  }
</style>
