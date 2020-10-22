<template>
	<div>
		<div v-if="user.me">
			<b-card title="Card Title" tag="article" class="mt-4">
				<b-card-text>
					<p>ID : {{ user.me.id }}</p>
					<p>Nom : {{ user.me.first_name }}</p> 
					<p>Prénom : {{ user.me.last_name }}</p> 
					<p>Email : {{ user.me.email }}</p>
				</b-card-text>
			</b-card>
		</div>
		<div v-if="user.friends">
			<h1>Mes Amis</h1>
			<div v-for="friend in user.friends" :key="friend.id">
				<p>ID : {{ friend.id }}</p>
				<p>{{ friend.first_name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: "Profile",
	computed: mapState(['user', 'myPosts']),
	methods: {}
};
</script>
