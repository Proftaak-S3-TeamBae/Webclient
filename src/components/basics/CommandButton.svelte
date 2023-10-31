<script lang="ts">
    import "./CommandButton.scss";

    export let title: string;
    export let description: string;
    export let icon: string;
</script>

<div class="cmd-button">
    {#if icon != ""}
        <div class="left">
            <div class="icon">
                <span class={`material-symbols-outlined icon`}>{icon}</span>
            </div>
        </div>
    {/if}
    <div class="right">
        <div class="label">{title}</div>
        <div class="description">{description}</div>
    </div>
</div>
