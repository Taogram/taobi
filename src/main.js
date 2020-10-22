/*
 * @Description: default main.js
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-07 14:34:37
 * @LastEditors: lax
 * @LastEditTime: 2020-10-10 13:51:15
 */

/**
 * default import vue router store
 */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// load vant
// import Vant from "vant";
// import "vant/lib/index.css";
// Vue.use(Vant);

// load Tao
import Tao from "tao-vue-template";
console.log(Tao);
import fmPlugin from "fm93-vue-template";
import "tao-vue-template/lib/tao.css";
Vue.use(Tao, {
	log: { isEnabled: true },
	plugins: [fmPlugin]
});

import "video.js/dist/video-js.css";

// animate.css
// import animated from "animate.css";
// Vue.use(animated);

// load mixin
import mixin from "@/mixins/global.js";
Vue.mixin(mixin);

// swiper
// import VueAwesomeSwiper from "vue-awesome-swiper";
// Vue.use(VueAwesomeSwiper);

// eslint-disable-next-line
Vue.config.productionTip = false;

// wx
import wxHandler from "wxsdk-handler";
Vue.use(wxHandler, {
	configFile: require("./../wx.js"),
	config:
		process.env.NODE_ENV === "development"
			? {
					debug: true,
					appid: "wxbfaae54e7f89f3fa",
					server: "https://wxt.server.1045fm.cn/",
					path: "wx/sign"
			  }
			: {}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
