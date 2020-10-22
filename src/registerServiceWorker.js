/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-04-07 19:56:56
 * @LastEditors: lax
 * @LastEditTime: 2020-09-14 13:09:35
 */
/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
	register(`${process.env.BASE_URL}service-worker.js`, {
		ready() {
			console.log(
				"App is being served from cache by a service worker.\n" +
					"For more details, visit https://goo.gl/AFskqB"
			);
		},
		registered() {
			console.log("Service worker has been registered.");
		},
		cached() {
			console.log("Content has been cached for offline use.");
		},
		updatefound() {
			console.log("New content is downloading.");
		},
		updated() {
			console.log("New content is available; please refresh.");
		},
		offline() {
			console.log(
				"No internet connection found. App is running in offline mode."
			);
		},
		error(error) {
			console.error("Error during service worker registration:", error);
		}
	});
}
