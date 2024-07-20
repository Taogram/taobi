/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-08-09 21:55:32
 * @LastEditors: lax
 * @LastEditTime: 2024-07-20 16:06:29
 */
const path = require("path");
module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		library: {
			name: "Taobi",
			type: "umd",
		},
		globalObject: "this",
		path: path.resolve(__dirname, "lib"),
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
		],
	},
};
