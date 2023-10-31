<script lang="ts">
    import "./ServiceButton.scss";

    export let icon: string;
    export let name: string;
    export let shown: boolean;

    const ontoggle = () => {
        shown = !shown;
    };

    const onkeydown = (event: KeyboardEvent) => {
        // If the element is not focused, return
        if (document.activeElement !== event.target) return;
        if (event.key !== "Enter") return;
        ontoggle();
    };
</script>

<div
    class="service-button"
    on:click={ontoggle}
    on:keydown={onkeydown}
    role="button"
    tabindex="0"
>
    <img class="icon" src={icon} alt="openai" />
    <div class="label">{name}</div>
</div>
