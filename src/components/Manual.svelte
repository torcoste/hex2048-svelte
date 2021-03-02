<script>
  export let radius

  const selectRadiusText = "Select radius for start"
  const useKeysForMove =
    "Use <strong>q</strong>, <strong>w</strong>, <strong>e</strong>, <strong>a</strong>, <strong>s</strong>, <strong>d</strong> keys for move"
</script>

<p>{@html radius ? useKeysForMove : selectRadiusText}</p>

<style>
</style>
