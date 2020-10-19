<template>
	<div class="container">
		<Profile />
		<List />
		<h1>Mes posts</h1>
		<div v-for="post in posts" :key="post.id">
			<Card :title="post.title" :content="post.content" :author="post.author" />
		</div>
	</div>
</template>

<script>
import Profile from "@/components/Me/Profile";
import List from "@/components/Friendlist/List";
import Card from "@/components/Posts/Card";
import axios from "axios";

export default {
	name: "Home",
	data() {
		return {
			posts: null,
		};
	},
	components: {
		Profile,
		List,
		Card,
	},
	mounted() {
		this.getPosts();
	},
	methods: {
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
