/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-06-29 20:29:55
 * @LastEditors: lax
 * @LastEditTime: 2020-09-14 13:09:43
 */
export default {
	data: function() {
		return {
			env: process.env.NODE_ENV === "production"
		};
	}
};
