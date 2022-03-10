/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-01 15:31:42
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 21:58:43
 * @FilePath: \taobi\src\tools\word\templateByDay.js
 */

const { getPathByEcharts } = require("@/tools/path/index.js");
const { cx, cy, font_size } = require("@/tools/word/properties.js");

module.exports = () => {
	return [
		[
			{
				type: "text",
				val: "一。FM93节目互动数据",
				opt: { bold: true, align: "right", font_size },
			},
			{
				type: "image",
				path: getPathByEcharts("93-0.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("93-1.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("93-2.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("93.png", true),
				opt: { cx, cy },
			},
		],
		[
			{
				type: "text",
				val: "二。FM1045节目互动数据",
				opt: { bold: true, align: "right", font_size },
			},
			{
				type: "image",
				path: getPathByEcharts("1045.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("1045-0.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("1045-1.png", true),
				opt: { cx, cy },
			},
			{
				type: "image",
				path: getPathByEcharts("1045-2.png", true),
				opt: { cx, cy },
			},
		],
	];
};
