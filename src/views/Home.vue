<template>
	<div class="home">
		
		<Posts />
	</div>
</template>

<script>

import Posts from "@/components/Home/Posts";

export default {
	name: "Home",
	components: {
		Posts,
	},
	mounted() {
		this.$store.dispatch('me');
		this.$store.dispatch('friends');
		this.$store.dispatch("posts");
		this.$store.dispatch("myPosts");
	},
};
</script>
