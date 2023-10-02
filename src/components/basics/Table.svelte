<script lang="ts">
    import "./Table.scss";

    export let headers: string[];
</script>

<div class="ui-table">
    <div class="row hdr">
        {#each headers as header}
            <div>{header}</div>
        {/each}
    </div>
</div>
