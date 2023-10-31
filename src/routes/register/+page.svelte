<script>
    import "./Register.scss";
    import background from "$lib/images/background.png";
    import Form from "../../components/register/Form.svelte";
</script>

<svelte:head>
    <title>Register</title>
    <meta name="description" content="Register Page" />
</svelte:head>

<div class="page register">
    <div class="dual-pane">
        <div class="left">
            <div class="page-title">AI Scanner</div>
            <Form />
        </div>
        <div class="right" style={`background-image: url(${background});`} />
    </div>
</div>
