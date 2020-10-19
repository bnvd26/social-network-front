<template>
	<div class="hello">
		<b-navbar type="dark" variant="dark">
			<b-navbar-nav>
				<b-nav-item href="/home">Home</b-nav-item>
				<b-nav-item href="/login">Login</b-nav-item>
			</b-navbar-nav>
			<b-nav-form @submit="onSubmit">
				<b-form-input v-model="form.s" class="mr-sm-2" placeholder="Search"></b-form-input>
				<b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
					>Search</b-button
				>
			</b-nav-form>
			<b-navbar-nav>
				<b-nav-item v-on:click="logout">Deconnexion</b-nav-item>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Navbar",
	data() {
		return {
			form: {
				s: "",
			},
		};
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			axios
				.get("http://localhost:81/api/users?s=" + this.form.s, {
					headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token"), },
				})
				.then(function(response) {
					console.log(response.data)
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		logout() {
			localStorage.removeItem("token");
		},
	},
};
</script>
