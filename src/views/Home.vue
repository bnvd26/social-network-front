<template>
	<div class="home">
		<Title />
		<Posts />
	</div>
</template>

<script>
// @ is an alias to /src
import Title from "@/components/Home/Title";
import Posts from "@/components/Home/Posts";

export default {
	name: "Home",
	components: {
		Title,
		Posts,
	},
};
</script>
