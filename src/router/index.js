/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-07 14:34:37
 * @LastEditors: lax
 * @LastEditTime: 2020-09-14 13:09:27
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index
	},
	{
		path: "/about",
		name: "About"
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () =>
		//   import(/* webpackChunkName: "about" */ "../views/About.vue")
	}
];

const router = new VueRouter({
	// mode: "history",
	mode: "hash",
	base: process.env.BASE_URL,
	routes
});

export default router;
