<script lang="ts">
    import { onMount } from "svelte";
    import "../basics/Field.scss";
    import "./ConfirmField.scss";

    export let label: string;
    export let type: string;
    export let name: string;
    export let password: string;
    export let matched: boolean = false;
    export let notmatchingmessage: string;
    export let oninput: (event: Event) => void = () => void 0;

    let matchinglabel = "";
    let matchingclass = "not-matching";
    let inputElement: HTMLInputElement;

    /// Checks the input every 100 milliseconds
    const checkinput = () => {
        if (inputElement === undefined) return;
        const passwordValue = inputElement.value;
        if (matchinglabel !== null) {
            matched = passwordValue === password;
            if (matched) {
                matchinglabel = "";
                matchingclass = "matching";
                inputElement.className = "green-border";
            } else {
                matchinglabel = notmatchingmessage;
                matchingclass = "not-matching";
                inputElement.className = "red-border";
            }
        }
        setTimeout(() => {
            checkinput();
        }, 100);
    };

    onMount(() => {
        checkinput();
    });
</script>

<div class="field">
    <div class="label">{label}</div>
    <input bind:this={inputElement} {type} {name} on:input={oninput} />
    <div id="matching" class={matchingclass}>
        {matchinglabel}
        <span />
    </div>
</div>
