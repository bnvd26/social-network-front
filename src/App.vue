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
	mounted() {},
};
</script>

