<template>
	<div class="hello">
		
		<b-navbar type="dark" variant="dark">
			<b-navbar-nav>
				<router-link to="home" v-if="user.isAuthenticated">Home</router-link>
				<router-link to="friendlist" v-if="user.isAuthenticated">Liste d'amis</router-link>
				<router-link to="login" v-if="!user.isAuthenticated">Se connecter</router-link>
			</b-navbar-nav>
			<b-nav-form @submit="onSubmit" v-if="user.isAuthenticated">
				<b-form-input v-model="form.s" class="mr-sm-2" placeholder="Search"></b-form-input>
				<b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
					>Search</b-button
				>
			</b-nav-form>
			<b-navbar-nav>
				<router-link to="me" v-if="user.isAuthenticated">Mon profil</router-link>
				<p @click="logout" class="text-white" v-if="user.isAuthenticated">Déconnexion</p>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
import {laravelEchoServer} from '../../services/laravelEchoServer'

export default {
	name: "Navbar",
	data() {
		return {
			form: {
				s: "",
			},
		};
	},
	computed: mapState(['user']),
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			axios
				.get("http://localhost:81/api/users?s=" + this.form.s, {
					headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token"), },
				})
				.then(() => {
					this.$route.push('login');
					
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		logout() {		
			axios
				.get("http://localhost:81/api/logout", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				}).then(() => {
					let echoServer = new laravelEchoServer(this.user.me.id)
					echoServer.disconnexion(this.user.me.id)
					this.$store.dispatch("deconnection");
					localStorage.removeItem("token");
					this.$router.push('login');
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	},
};
</script>
