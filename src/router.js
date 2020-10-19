import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Friendlist from "./views/Friendlist.vue";
import Me from "./views/Me.vue";

Vue.use(Router);

const router = new Router({
	mode: "history",
	linkActiveClass: "is-active",
	routes: [
		{
			path: "/home",
			name: "home",
			component: Home,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/friendlist",
			name: "friendlist",
			component: Friendlist,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/me",
			name: "me",
			component: Me,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "*",
			redirect: { name: "home" },
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!localStorage.getItem("token")) {
			next({ name: "login" });
		} else {
			next(); // go to wherever I'm going
		}
	} else {
		next(); // does not require auth, make sure to always call next()!
	}
});

export default router;
