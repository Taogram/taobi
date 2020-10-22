/*
 * @Description: vue配置模板文件
 * @Version: 1.1.0
 * @Autor: lax
 * @Date: 2020-04-01 12:54:53
 * @LastEditors: lax
 * @LastEditTime: 2020-10-10 10:35:50
 */
const tinypngPlugin = require("vue-tinypng-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
	configureWebpack: config => {
		/* vue 断点 */
		config.devtool = "source-map";
		// plugin
		const plugins = [
			new MiniCssExtractPlugin({
				filename: `css/[name].css?v=[hash:6]`,
				chunkFilename: `css/[name].css?v=[hash:6]`
			})
		];
		// output
		const output = {
			filename: "js/[name].js?v=[hash:6]",
			chunkFilename: "js/[name].js?v=[hash:6]"
		};
		if (config.mode === "production") plugins.push(new tinypngPlugin());

		return { output, plugins };
	},
	/* 设置build的引用文件路径 */
	publicPath: "./",
	/* 生产环境sourcemap 清除 */
	productionSourceMap: false,
	/* 取消文件名hash值 */
	filenameHashing: false,
	/**
	 * 自定义file-loader
	 * html图片访问格式调整：[name].[ext]?v=[hash:6]
	 * like: content.png?v=s2421a
	 */
	chainWebpack: config => {
		config.module
			.rule("images")
			.use("url-loader")
			.loader("file-loader")
			.options({
				name: "[path][name].[ext]?v=[hash:6]"
			});
		config.resolve.alias.set("@", path.join(__dirname, "./src"));
		// .set(
		// 	"@tao",
		// 	path.join(__dirname, "./node_modules/tao-vue-template/packages/")
		// );
	}
};
