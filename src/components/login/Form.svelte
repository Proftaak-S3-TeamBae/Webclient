<script>
    import Field from "../basics/Field.svelte";
    import FormButton from "../basics/FormButton.svelte";
    import "./Form.scss";
</script>

<div class="form">
    <Field label="Username" type="text" name="username" />
    <Field label="Password" type="password" name="password" />

    <div class="buttons">
        <FormButton label="Log In" filled={true} onClick={() => void 0} />

        <FormButton
            label="Create Account"
            filled={false}
            onClick={() => void 0}
        />
    </div>
</div>
