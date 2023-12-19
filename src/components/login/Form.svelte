<script>
  import { loginAccount } from "$lib/api/AuthAPI";
  import Field from "../basics/Field.svelte";
  import FormButton from "../basics/FormButton.svelte";
  import PasswordField from "../basics/PasswordField.svelte";
  import "./Form.scss";

  let username = "";
  let password = "";

  const confirm = async () => {
    try {
      await loginAccount(username, password);
    } catch (e) {
      window.location.href = "/error?msg=" + window.btoa(JSON.stringify(e));
      return;
    }
    window.location.href = "/list";
  };
</script>

<div class="form">
  <Field label="Username" type="text" name="username" bind:value={username} />
  <PasswordField
    label="Password"
    name="password"
    bind:value={password}
    checkPasswordStrength={false}
  />

  <div class="buttons">
    <FormButton label="Log In" filled={true} onClick={confirm} />

    <FormButton
      label="Create Account"
      filled={false}
      onClick={() => (window.location.href = "/register")}
    />
  </div>
</div>
