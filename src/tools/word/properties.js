/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-06 18:24:50
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 22:13:56
 * @FilePath: \taobi\src\tools\word\properties.js
 */

const { BorderStyle } = require("docx");

module.exports = {
	width: 460,
	height: 240,
	font_size: 16,
	SIZE: { sz: "18", cellColHeight: 2000 },
	borders: ({ size = 1, color = "black" }) => {
		return {
			top: {
				style: BorderStyle.DASH_SMALL_GAP,
				size,
				color,
			},
			bottom: {
				style: BorderStyle.DASH_SMALL_GAP,
				size,
				color,
			},
			left: {
				style: BorderStyle.DASH_SMALL_GAP,
				size,
				color,
			},
			right: {
				style: BorderStyle.DASH_SMALL_GAP,
				size,
				color,
			},
		};
	},
};
