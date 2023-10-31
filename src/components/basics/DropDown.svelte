<script lang="ts">
    import type { DropDownItem } from "./DropDown";
    import "./DropDown.scss";

    let selecting: boolean = false;
    export let items: DropDownItem[];
    export let selectedItem: DropDownItem = items[0];
</script>

<div class="dropdown">
    <div
        class="item"
        on:click={() => (selecting = !selecting)}
        on:keydown={(e) => {
            if (document.activeElement !== e.target) return;
            if (e.key !== "Enter") return;
            selecting = !selecting;
        }}
        tabindex="0"
        role="button"
    >
        {#if selectedItem.icon !== undefined}
            <img
                class="icon"
                src={selectedItem.icon}
                alt={selectedItem.label}
            />
        {/if}
        <span class="label">{selectedItem.label}</span>
        <span class="material-symbols-outlined" style="float: right">
            {selecting ? "expand_less" : "expand_more"}
        </span>
    </div>
    {#if selecting}
        <div class="dropdown-items">
            {#each items as item}
                <div
                    class="item"
                    on:click={() => {
                        selectedItem = item;
                        selecting = false;
                    }}
                    on:keydown={(e) => {
                        if (document.activeElement !== e.target) return;
                        if (e.key !== "Enter") return;
                        selectedItem = item;
                        selecting = false;
                    }}
                    tabindex="0"
                    role="button"
                >
                    {#if item.icon !== undefined}
                        <img class="icon" src={item.icon} alt={item.label} />
                    {/if}
                    <span class="label">{item.label}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>
