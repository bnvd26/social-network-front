<template>
	<div class="container">
		<div class="m-4">
			<div class="d-flex align-items-center">
				<h2 class="text-left mr-2">Ecrire un post</h2>
				<b-icon icon="pencil-square" aria-hidden="true"></b-icon>
			</div>

			<b-form @submit="onSubmit">
				<div class="d-flex">
					<b-form-textarea
						id="textarea"
						v-model="form.content"
						placeholder="Enter something..."
						rows="2"
						max-rows="6"
					></b-form-textarea>

					<b-button type="submit" variant="primary" class="ml-3"><b-icon icon="capslock" aria-hidden="true"></b-icon></b-button>
				</div>
			</b-form>
		</div>
		<h1>Posts</h1>

		<div v-for="post in posts" :key="post.id" class="m-4">
			<b-card
				border-variant="secondary"
				:header="post.title"
				header-border-variant="secondary"
				align="center"
			>
				<b-card-text>{{ post.content }}</b-card-text>
				<p class="font-italic">{{ post.author }}</p>
			</b-card>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Posts",
	data() {
		return {
			form: {
				content: "",
			},
			show: true,
			posts: null,
		};
	},
	mounted() {
		this.getPosts();
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();
			axios
				.post(
					"http://localhost:81/api/post/create",
					JSON.stringify(this.form),
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},
				)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getPosts() {
			axios
				.get("http://localhost:81/api/posts", {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					this.posts = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
