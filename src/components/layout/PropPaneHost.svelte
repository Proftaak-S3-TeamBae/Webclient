<script lang="ts">
    import "./PropPaneHost.scss";

    interface PageItem {
        label: string;
        icon: string;
    }

    export let pages : PageItem[] = [];
    export let onPageOpen = (id: number)=>{};
    export let activePage : number = 0;
</script>

<div class="proppane-host">
    <div class="left">
        {#each pages as item, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class={`item${(i == activePage) ? ` active` : ''}`}
                on:click={()=>onPageOpen(i)}
                >
                <span class="material-symbols-outlined">{item.icon}</span>
                <span class="label">{item.label}</span>
            </div>
        {/each}
    </div>
    <div class="right">
        <slot/>
    </div>
</div>