<template>
	<div class="hello">
		<div id="login-card" class="card">
			<div class="card-body">
				<h2 class="text-center">Login form</h2>
				<br>
				<form @submit="onSubmit">
					<div class="form-group">
						<input v-model="form.email"
					type="email"
					required
					placeholder="Enter email" class="form-control" id="email" name="email">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" id="email" placeholder="Enter password" name="pswd" v-model="form.password"
					required
					>
					</div>
					<button type="submit" id="button" class="btn btn-primary deep-purple btn-block ">Submit</button>
					<br>
					<br>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
import {laravelEchoServer} from '../../services/laravelEchoServer';

export default {
	name: "Login",
	props: {
		msg: String,
	},
	data() {
		return {
			form: {
				email: "",
				password: "",
			},
			show: true,
		};
	},
	computed: mapState(['user']),
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			axios
				.post("http://localhost:81/api/login", JSON.stringify(this.form), {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					localStorage.setItem("token", response.data.access_token);
					this.$store.dispatch('me');
					this.$store.dispatch('friends');
					this.$store.dispatch("posts");
					this.$store.dispatch("myPosts");
				}).then(() => {
					let echoServer = new laravelEchoServer(this.user.me.id)
					echoServer.connect()
					this.$router.push('home')
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		onReset(evt) {
			evt.preventDefault();
			// Reset our form values
			this.form.email = "";
			this.form.password = "";
			// Trick to reset/clear native browser form validation state
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
	}
};
</script>
