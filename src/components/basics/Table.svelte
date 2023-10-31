<script lang="ts">
    import CheckBox from "../form/CheckBox.svelte";
    import "./Table.scss";

    /// Table headers
    interface TabelData {
        data: any;
        icon?: string;
    }

    export let headers: string[];
    export let data: TabelData[][] = [];
    export let addCheckBoxes: boolean = false;

    // Checked items state
    let checkedItems : boolean[] = data.map(() => false);

    // schizophrenia?
    // realyl this is some divine code!
    // how do i update the state
    // hold up i got an idea
    // :(
    // And that my friend, is devine code
    // I overengineered it at the start
    // if it cannot be done simply, its wrong :)
    // indeed yes
    // Google hire this man
    // So true king
    // Time to add checkboxes to integrations
    // Do we need to? is that not just a list?
    // A user may want to remove an integration or remove multiple
    // Nah youre right. Carry on gentlemen.
    // Ver true
    // With just a little flag, integrations now has checkboxes
    
    // Also, both lists having a common interface for the same type of tasks is good UX i think?

    const tableSelectAll = (checked: boolean)=>{
        for(let x = 0; x < checkedItems.length; x++)
            checkedItems[x] = checked;
    }
</script>

<div class="ui-table">
    <div class="row hdr">
        {#if addCheckBoxes}
            <div class="cbox-cell">
                <CheckBox invertedStyle={true} onChange={tableSelectAll}/>
            </div>   
        {/if}
        {#each headers as header}
            <div>{header}</div>
        {/each}
    </div>
    {#each data as row, i}
        <div class={"row " + (i % 2 == 0 ? "even" : "odd")}>
            {#if addCheckBoxes}
                <div class="cbox-cell">
                    <CheckBox checked={checkedItems[i]}/>
                </div>   
            {/if}
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
