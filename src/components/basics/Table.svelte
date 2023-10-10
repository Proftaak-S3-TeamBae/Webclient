<script lang="ts">
    import "./Table.scss";

    /// Table headers
    interface TabelData {
        data: any;
        icon?: string;
    }

    export let headers: string[];
    export let data: TabelData[][] = [];
</script>

<div class="ui-table">
    <div class="row hdr">
        {#each headers as header}
            <div>{header}</div>
        {/each}
    </div>
    {#each data as row, i}
        <div class={"row " + (i % 2 == 0 ? "even" : "odd")}>
            {#each headers as headers, i2}
                <div class="col">
                    {#if data[i][i2].icon !== undefined}
                        <div
                            class="icon"
                            style={`background-image: url(${data[i][i2].icon})`}
                        />
                    {/if}
                    <span class="label">{data[i][i2].data}</span>
                </div>
            {/each}
        </div>
    {/each}
</div>
