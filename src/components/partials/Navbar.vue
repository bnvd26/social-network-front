<template>
	<div class="hello">
		<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
			<a class="navbar-brand" href="#">BA26</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarsExample05">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						
						<router-link to="home" v-if="user.isAuthenticated" class="nav-link">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link to="friendlist" v-if="user.isAuthenticated" class="nav-link">Liste d'amis</router-link>
					</li>
					<li class="nav-item">
						<router-link to="login" v-if="!user.isAuthenticated" class="nav-link">Se connecter</router-link>
					</li>
					<li class="nav-item dropdown">
						<router-link to="me" v-if="user.isAuthenticated" class="nav-link">Mon profil</router-link>
					</li>
				</ul>
				<b-nav-form @submit="onSubmit" v-if="user.isAuthenticated">
					<b-form-input v-model="form.s" class="form-control" placeholder="Search"></b-form-input>
					<b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
				</b-nav-form>
				<p @click="logout" class="text-white" v-if="user.isAuthenticated">Déconnexion</p>
			</div>
		</nav>
		
		<b-navbar type="dark" variant="dark">
		
			<b-navbar-nav>
				
				
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
