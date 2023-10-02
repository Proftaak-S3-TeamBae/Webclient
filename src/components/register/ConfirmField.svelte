<script lang="ts">
    import "../basics/Field.scss";
    import "./ConfirmField.scss";

    export let label: string;
    export let type: string;
    export let name: string;
    export let value: string;
    export let notmatchingmessage: string;
    export let oninput: (event: Event) => void = () => void 0;

    let matchinglabel = "";
    let matchingclass = "not-matching";

    /// On change of input
    const oninputchange = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        const password = inputElement.value;
        if (matchinglabel !== null) {
            if (password === value) {
                matchinglabel = "";
                matchingclass = "matching";
                inputElement.className = "green-border";
            } else {
                matchinglabel = notmatchingmessage;
                matchingclass = "not-matching";
                inputElement.className = "red-border";
            }
        }
    };
</script>

<div class="field">
    <div class="label">{label}</div>
    <input
        {type}
        {name}
        on:input={(event) => {
            oninputchange(event);
            oninput(event);
        }}
    />
    <div id="matching" class={matchingclass}>
        {matchinglabel}
        <span />
    </div>
</div>
