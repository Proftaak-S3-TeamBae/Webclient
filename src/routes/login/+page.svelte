<script>
    import Form from "../../components/login/Form.svelte";
    import "./Login.scss";
    import background from "$lib/images/background.png";
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login Page" />
</svelte:head>

<div class="page login">
    <div class="dual-pane">
        <div class="left">
            <div class="page-title">AI Scanner</div>
            <Form />
        </div>
        <div class="right" style={`background-image: url(${background});`} />
    </div>
</div>
