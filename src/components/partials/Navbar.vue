<template>
	<div class="hello">
		<b-navbar type="dark" variant="dark">
			<b-navbar-nav>
				<b-nav-item href="/home">Home</b-nav-item>
				<b-nav-item href="/login">Login</b-nav-item>
				<b-nav-item v-on:click="logout">Deconnexion</b-nav-item>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: "Navbar",
	methods: {
		logout() {
			localStorage.removeItem("token");
		},
	},
};
</script>
