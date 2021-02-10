/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 18:58:04
 * @LastEditors: lax
 * @LastEditTime: 2021-02-10 22:31:09
 * @FilePath: \taobi\.eslintrc.js
 */
module.exports = {
	env: {
		node: true,
		es2020: true,
	},
	extends: [
		"airbnb-base",
		"plugin:prettier/recommended",
		"plugin:jest/recommended",
	],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	rules: {
		"no-bitwise": 0,
		"no-plusplus": 0,
		"no-underscore-dangle":0
	},
};
