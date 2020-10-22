import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user : {
			me: [],
			friends: [],
			isAuthenticated: false,
			isConnected: null,
		},
		posts : {
			myPosts: [],
			data: [],
		},
	},
	mutations: {
		SAVE_ME(state, me) {
			state.user.me = me;
		},
		IS_AUTHENTICATED(state, isAuthenticated) {
			state.user.isAuthenticated = isAuthenticated
		},
		IS_CONNECTED(state, isConnected) {
			state.user.isConnected = isConnected
		},
		SAVE_POSTS(state, payload) {
			state.posts.data = payload;
		},
		SAVE_MY_POSTS(state, payload) {
			state.posts.myPosts = payload;
		},
		SAVE_MY_FRIENDS(state, payload) {
			state.user.friends = payload;
		}
	},
	actions: {
		me({commit}) {
			axios
			.get("http://localhost:81/api/profile", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				commit('SAVE_ME', response.data);
				commit('IS_AUTHENTICATED', true);
			})
			.catch(() => {
				commit('IS_AUTHENTICATED', false);
			});
		},
		connection({commit}) {
			commit('IS_CONNECTED', true)
		},
		deconnection({commit}) {
			commit('IS_AUTHENTICATED', false);
		},
		posts({commit}) {
			axios
			.get("http://localhost:81/api/posts", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				commit('SAVE_POSTS', response.data);
			})
		},
		myPosts({commit}) {
			axios
			.get("http://localhost:81/api/my-posts", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				commit('SAVE_MY_POSTS', response.data);
			})
		},
		friends({commit}) {
			axios
			.get("http://localhost:81/api/friends", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				commit('SAVE_MY_FRIENDS', response.data);
			})
		}
	},
})
