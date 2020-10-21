<template>
	<div class="container">
		<div v-if="user.me">
			{{ user.me.id }}
			{{ user.me.email }}
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: "Profile",
	computed: mapState(['user', 'myPosts']),
	methods: {},
};
</script>
