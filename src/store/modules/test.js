/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-06-29 20:41:01
 * @LastEditors: lax
 * @LastEditTime: 2020-09-27 17:12:21
 */
export default {
	namespaced: true,
	state: {
		data: 123
	},
	getters: {
		getData: state => {
			return state.data;
		}
	},
	actions: {},
	mutations: {}
};
