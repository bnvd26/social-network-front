<template>
	<div class="container">
		<div>
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
		<div v-if="posts">
			<div v-for="post in posts.data" :key="post.id">
				<b-card
					border-variant="secondary"
					:header="post.title"
					header-border-variant="secondary"
					align="left"
				>
					<b-card-text>{{ post.content }}</b-card-text>
					<p class="font-italic">{{ post.author }}</p>
					<p v-if="post.user.isConnected">état : ✅</p>
					<p v-else>état : ❌ </p>
					<p>{{ post.count_like }}<p>
					<div v-if="post.liked">
						<button v-on:click="dislike" :value="post.id">dislike</button>
					</div>
					<div v-else>
						<button v-on:click="like" :value="post.id">like</button>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {mapState} from 'vuex'

export default {
	name: "Posts",
	data() {
		return {
			form: {
				content: "",
			},
			show: true,
		};
	},
	computed: mapState(['posts']),
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
				.then(() => {
					this.$store.dispatch('posts');
					this.form.content = "";
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		like(evt) {
			console.log(evt.target.value)
			evt.preventDefault();
			axios
				.post(
					"http://localhost:81/api/post/" + evt.target.value + "/like",
					JSON.stringify(this.form),
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},
				)
				.then(() => {
					this.$store.dispatch('posts');
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		dislike(evt) {
			console.log(evt.target.value)
			evt.preventDefault();
			axios
				.delete(
					"http://localhost:81/api/post/" + evt.target.value + "/unlike",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
						},
					},
				)
				.then(() => {
					this.$store.dispatch('posts');
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
