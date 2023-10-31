<script lang="ts">
    import ContentContainer from "./ContentContainer.svelte";
    import "./Overlay.scss";

    type Behavior = "persist" | "hide-on-outside-click";

    export let icon: string | undefined = undefined;
    export let name: string;
    export let shown: boolean = false;
    export let behavior: Behavior = "persist";

    $: decidedDisplay = shown ? "display: flex;" : "display: none;";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="overlay"
    style={decidedDisplay}
    on:click={(e) => {
        if (behavior !== "hide-on-outside-click") return;
        if (e.target !== e.currentTarget) return;
        shown = false;
    }}
>
    <ContentContainer>
        <div class="box">
            <div class="header-bk">
                {#if icon !== undefined}
                    <img class="icon" src={icon} alt={name} />
                {/if}
                <div class="name">{name}</div>
                <span
                    style="float: right; color: #fff"
                    class="material-symbols-outlined close-icon"
                    on:click={() => {
                        shown = false;
                    }}
                    on:keypress={(e) => {
                        if (document.activeElement !== e.target) return;
                        if (e.key !== "Enter") return;
                        shown = false;
                    }}
                    role="button"
                    tabindex="0"
                >
                    close
                </span>
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
    </ContentContainer>
</div>
