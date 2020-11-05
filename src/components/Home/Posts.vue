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
				<div class="card mt-3">
					<div class="card-header">
						<div class="d-flex">
							
							<p v-if="post.user.isConnected">✅</p>
							<p v-else>❌ </p>
							
							{{post.author}} <small>à {{ post.created_at }}</small>
						</div>
					</div>
					<div class="card-body">
						<h5 class="card-title">{{post.title}}</h5>
						<p class="card-text">{{ post.content }}</p>
						<button v-if="post.liked" v-on:click="dislike" :id="post.id">
							<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							viewBox="0 0 391.837 391.837" style="enable-background:new 0 0 391.837 391.837;" xml:space="preserve">
							<g>
								<path style="fill:#D7443E;" d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
									c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
									c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
							</g>

							</svg>
						<!-- <button v-on:click="dislike" :value="post.id">dislike</button> -->
						</button>
						<button v-else v-on:click="like" :id="post.id">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 412.735 412.735" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g>
							<g xmlns="http://www.w3.org/2000/svg"><g><path d="M295.706,35.522C295.706,35.522,295.706,35.522,295.706,35.522c-34.43-0.184-67.161,14.937-89.339,41.273    c-22.039-26.516-54.861-41.68-89.339-41.273C52.395,35.522,0,87.917,0,152.55C0,263.31,193.306,371.456,201.143,375.636    c3.162,2.113,7.286,2.113,10.449,0c7.837-4.18,201.143-110.759,201.143-223.086C412.735,87.917,360.339,35.522,295.706,35.522z     M206.367,354.738C176.065,336.975,20.898,242.412,20.898,152.55c0-53.091,43.039-96.131,96.131-96.131    c32.512-0.427,62.938,15.972,80.457,43.363c3.557,4.905,10.418,5.998,15.323,2.44c0.937-0.68,1.761-1.503,2.44-2.44    c29.055-44.435,88.631-56.903,133.066-27.848c27.202,17.787,43.575,48.114,43.521,80.615    C391.837,243.456,236.669,337.497,206.367,354.738z" fill="#d7443e" data-original="#000000" style="" class=""/></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>
						</button>
					</div>
				</div>
				<!-- <b-card
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
				</b-card> -->
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
			console.log(evt.target)
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
			console.log(evt.target)
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
button {
	border: 0;
	background: transparent;
}
svg {
	width: 40px;
}
</style>
