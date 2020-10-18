<template>
	<div class="home">
		<Form />
	</div>
</template>

<script>
// @ is an alias to /src
import Form from "@/components/Login/Form.vue";

export default {
	name: "Login",
	components: {
		Form,
	},
};
</script>
