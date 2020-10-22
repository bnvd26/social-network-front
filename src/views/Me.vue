<template>
	<div class="container">
		<Profile />
		<h1>Mes posts</h1>
		<div v-if="posts.myPosts">
			<div v-for="post in posts.myPosts" :key="post.id">
				<Card :title="post.title" :content="post.content" :author="post.author" />
			</div>
		</div>
	</div>
</template>

<script>
import Profile from "@/components/Me/Profile";
import Card from "@/components/Posts/Card";
import {mapState} from 'vuex'

export default {
	name: "Home",
	computed: mapState(['posts']),
	components: {
		Profile,
		Card,
	}
};
</script>
