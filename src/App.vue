<template>
	<div id="app">
		<Navbar />
		<router-view />
	</div>
</template>

<script>
import "./assets/css/App.css";

import Navbar from "@/components/partials/Navbar";

export default {
	components: {
		Navbar,
	},
	created() {
		this.$store.dispatch('me');
		this.$store.dispatch('friends');
		this.$store.dispatch("posts");
		this.$store.dispatch("myPosts");
	}
};
</script>

