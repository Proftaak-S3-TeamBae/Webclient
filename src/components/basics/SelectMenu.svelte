<script lang="ts">
  export let links: string[] = [];
</script>

<select class="hamburger-dropdown">
  {#each links as link}
    <option value={link}>{link}</option>
  {/each}
</select>
