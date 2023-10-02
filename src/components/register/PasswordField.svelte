<script lang="ts">
    import "./PasswordField.scss";
    import zxcvbn from "zxcvbn";
    import "../basics/Field.scss";

    export let label: string;
    export let type: string;
    export let name: string;
    export let value: string;
    export let oninput: (event: Event) => void = () => void 0;

    // The password strength class
    let passwordstrengthclass = "strength-0";

    /// On change of password
    const onpasswordchange = (event: Event) => {
        const password = (event.target as HTMLInputElement).value;
        const result = zxcvbn(password);
        passwordstrengthclass = `strength-${result.score}`;
        value = password;
    };
</script>

<div class="field">
    <div class="label">{label}</div>
    <input
        {type}
        {name}
        on:input={(event) => {
            onpasswordchange(event);
            oninput(event);
        }}
    />
    <div id="password-strength" class={passwordstrengthclass}><span /></div>
</div>
