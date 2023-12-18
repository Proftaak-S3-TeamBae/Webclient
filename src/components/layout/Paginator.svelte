<script lang="ts">
  import "./Paginator.scss";

  export let pageCount: number = 0;
  export let currentPage: number = 0;
  export let onChange = (page: number) => void 0;
</script>

<div class="paginator">
  {#each Array(pageCount) as _, index (index)}
    {#if index == currentPage}
      <div class="page active">{index + 1}</div>
    {:else}
      <div class="page" on:click={() => onChange(index)}>{index + 1}</div>
    {/if}
  {/each}
</div>
