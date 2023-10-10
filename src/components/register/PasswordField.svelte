<script lang="ts">
    import "./PasswordField.scss";
    import zxcvbn from "zxcvbn";
    import "../basics/Field.scss";

    export let label: string;
    export let name: string;
    export let value: string;
    export let oninput: (event: Event) => void = () => void 0;

    /// The password strength labels
    const passwordstrengthlabels = [
        "Very Weak",
        "Weak",
        "Medium",
        "Strong",
        "Very Strong",
    ];

    /// The input type
    $: type = passwordvisible ? "text" : "password";

    // The password strength class
    let passwordstrengthclass = "strength-0";
    let passwordstrengthlabel = "";

    // The visibility of the password
    let passwordvisible = false;

    /// On change of password
    const onpasswordchange = (event: Event) => {
        const password = (event.target as HTMLInputElement).value;
        const result = zxcvbn(password);
        passwordstrengthclass = `strength-${result.score}`;
        passwordstrengthlabel = passwordstrengthlabels[result.score];
        value = password;
    };
</script>

<div class="field">
    <div class="label">{label}</div>
    <div class="fieldcontent">
        <input
            {type}
            {name}
            on:input={(event) => {
                onpasswordchange(event);
                oninput(event);
            }}
        />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
            style="float: right;"
            class="material-symbols-outlined"
            on:click={() => {
                passwordvisible = !passwordvisible;
            }}
            on:keypress={(e) => {
                if (e.key !== "Enter") return;
                passwordvisible = !passwordvisible;
            }}
            role="button"
            tabindex="0"
        >
            {passwordvisible ? "visibility" : "visibility_off"}
        </span>

        <div id="password-strength" class={passwordstrengthclass}>
            <span />
        </div>
        <div class={passwordstrengthclass}>
            <div>{passwordstrengthlabel}</div>
        </div>
    </div>
</div>
