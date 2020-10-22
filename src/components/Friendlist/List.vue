<template>
	<div>
		<h1>Mes demandes d'amis</h1>
		<div
			v-for="requested_user in requested_users"
			:key="requested_user.email"
			class="m-4"
		>
			{{ requested_user.email }}
			<button v-on:click="acceptUser" :value="requested_user.id">Ajouter</button>
		</div>
		<div>
			<h1>Chercher un utilisateur</h1>
			<b-nav-form @submit="onSubmit">
				<b-form-input v-model="form.s" class="mr-sm-2" placeholder="Search"></b-form-input>
				<b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
					>Search</b-button
				>
			</b-nav-form>
			<div v-if="isLoading">
				<div class="text-center">
					<b-spinner type="grow" label="Spinning"></b-spinner>
				</div>
			</div>
			<div v-if="searchedUsers">
				<div v-for="searchedUser in searchedUsers" :key="searchedUser.id">
					{{ searchedUser.first_name + searchedUser.last_name }}
					<button v-on:click="addUser" :value="searchedUser.id">Ajouter l'ami</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {mapState} from 'vuex';

export default {
	name: "List",
	computed: mapState(['user']),
	data() {
		return {
			form: {
				s: "",
			},
			requested_users: null,
			searchedUsers: [], 
			isLoading: false
		};
	},
	methods: {
		onSubmit(evt) {
			this.isLoading = true;
			evt.preventDefault();
			axios
				.get("http://localhost:81/api/users?s=" + this.form.s, {
					headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token"), },
				})
				.then((response) => {
					console.log(response.data)
					this.searchedUsers = response.data;
					this.isLoading = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		addUser(evt) {
			axios
				.post(
					"http://localhost:81/api/friends/addFriend",
					JSON.stringify({ requested_user: evt.target.value }),
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},
				)
				.then((response) => {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		acceptUser(evt) {
			axios
				.get("http://localhost:81/api/friends/request/" + evt.target.value, {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getRequestedUsers() {
			axios
				.get("http://localhost:81/api/friends/request", {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					this.requested_users = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	},
};
</script>
