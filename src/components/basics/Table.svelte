<script lang="ts">
  import CheckBox from "../form/CheckBox.svelte";
  import "./Table.scss";

  /// Table headers
  interface TableData {
    data: any;
    icon?: string;
  }

  export let headers: string[];
  export let data: TableData[][] = [];
  export let addCheckBoxes: boolean = false;
  export let itemsAreClickable: boolean = false;
  export let onItemClicked: (index: number) => void = () => void 0;

  // Checked items state
  export let checkedItems: boolean[] = data.map(() => false);

  function getRowClass(i: number) {
    return i % 2 == 0 ? "even" : "odd";
  }

  const tableSelectAll = (checked: boolean) => {
    for (let x = 0; x < checkedItems.length; x++) checkedItems[x] = checked;
  };
</script>

<div class="ui-table">
  <div class="row hdr">
    {#if addCheckBoxes}
      <div class="cbox-cell">
        <CheckBox invertedStyle={true} onChange={tableSelectAll} />
      </div>
    {/if}
    {#each headers as header}
      <div>{header}</div>
    {/each}
  </div>
  {#each data as row, i}
    <div class={"row " + getRowClass(i)}>
      {#if addCheckBoxes}
        <div class="cbox-cell">
          <CheckBox bind:checked={checkedItems[i]} />
        </div>
      {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="col {itemsAreClickable ? 'clickable' : ''}"
        on:click={() => {
          onItemClicked(i);
        }}
      >
        {#each headers as headers, i2}
          <div class="item">
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
    </div>
  {/each}

  {#if data.length == 0}
    <div class="notice">No data.</div>
  {/if}
</div>
