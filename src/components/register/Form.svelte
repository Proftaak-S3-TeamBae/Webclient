<script lang="ts">
  import { registerAccount } from "$lib/api/AuthAPI";
  import Field from "../basics/Field.svelte";
  import FormButton from "../basics/FormButton.svelte";
  import ConfirmField from "./ConfirmField.svelte";
  import "./Form.scss";
  import PasswordField from "../basics/PasswordField.svelte";

  let username = "";
  let password = "";
  let email = "";
  let matched = false;

  // Confirm the account creation
  const confirm = async () => {
    console.log(matched);
    if (!matched || password === "") return;
    await registerAccount(username, email, password);
    window.location.href = "/list";
  };
</script>

<div class="form">
  <Field label="Username" type="text" name="username" bind:value={username} />
  <Field label="Email" type="text" name="email" bind:value={email} />

  <PasswordField
    label="Password"
    name="password"
    checkPasswordStrength={true}
    bind:value={password}
  />
  <ConfirmField
    label="Confirm Password"
    type="password"
    name="confirm password"
    {password}
    bind:matched
    notmatchingmessage="Passwords do not match"
  />

  <div class="buttons">
    <FormButton label="Create Account" filled={true} onClick={confirm} />

    <FormButton
      label="Log in"
      filled={false}
      onClick={() => (window.location.href = "login")}
    />
  </div>
</div>
