<script>
    import Field from "../basics/Field.svelte";
    import FormButton from "../basics/FormButton.svelte";
    import ConfirmField from "./ConfirmField.svelte";
    import "./Form.scss";
    import PasswordField from "./PasswordField.svelte";

    let password = "";
    let email = "";
</script>

<div class="form">
    <Field label="Username" type="text" name="username" />
    <Field label="Email" type="text" name="email" bind:value={email} />
    <ConfirmField
        label="Confirm Email"
        type="text"
        name="email"
        value={email}
        notmatchingmessage="Emails do not match"
    />
    <PasswordField
        label="Password"
        type="password"
        name="password"
        bind:value={password}
    />
    <ConfirmField
        label="Confirm Password"
        type="password"
        name="confirm password"
        value={password}
        notmatchingmessage="Passwords do not match"
    />

    <div class="buttons">
        <FormButton
            label="Create Account"
            filled={true}
            onClick={() => void 0}
        />

        <FormButton
            label="Log in"
            filled={false}
            onClick={() => (window.location.href = "login")}
        />
    </div>
</div>
