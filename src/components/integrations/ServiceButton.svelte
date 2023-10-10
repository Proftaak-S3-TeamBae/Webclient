<script lang="ts">
    import "./ServiceButton.scss";

    export let icon: string;
</script>

<div
    class="service-button"
    on:click={() => {}}
    on:keydown={() => {}}
    role="button"
    tabindex="0"
>
    <img class="icon" src={icon} alt="openai" />
    <div class="label"><slot /></div>
</div>
