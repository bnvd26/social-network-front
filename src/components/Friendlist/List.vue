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
		<h1>Mes amis</h1>
		<div v-for="friend in user.friends" :key="friend.id" class="m-4">
			<b-card
				border-variant="secondary"
				header-border-variant="secondary"
				align="center"
			>
				<b-card-text>{{ friend.last_name }}</b-card-text>
				<p class="font-italic">{{ friend.first_name }}</p>
			</b-card>
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
			requested_users: null,
		};
	},
	mounted() {
		this.getRequestedUsers();
	},
	methods: {
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
