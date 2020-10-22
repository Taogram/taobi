/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-09-23 23:40:23
 * @LastEditors: lax
 * @LastEditTime: 2020-09-27 17:12:33
 */
import Vue from "vue";
import Vuex from "vuex";
import { storePlugin } from "tao-vue-template";
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	plugins: [storePlugin]
});

const mods = require.context("./modules/", true, /\.js$/);
mods.keys().map(mod => {
	store.registerModule(getName(mod), mods(mod).default);
});

export default store;

function getName(str, is = true) {
	const p = "./";
	let name = str.slice(str.indexOf(p) + 2, str.indexOf(".js"));
	if (is) name = name.toLowerCase();
	return name;
}
