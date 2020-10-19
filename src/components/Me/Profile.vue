<template>
	<div class="container">
		<div v-if="me">
			{{ me.id }}
			{{ me.email }}
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Profile",
	data() {
		return {
			me: null,
		};
	},
	mounted() {
		this.getMe();
	},
	methods: {
		getMe() {
			axios
				.get("http://localhost:81/api/profile", {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					this.me = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	},
};
</script>
