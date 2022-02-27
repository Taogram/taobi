/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-10-15 23:24:59
 * @LastEditors: lax
 * @LastEditTime: 2021-10-15 23:42:40
 * @FilePath: \taobi\src\pojo\algorithm\year.js
 */
const _ = require("@/tools/index");

module.exports = (year) => {
	// 年份个位数=>天干 补6顺位
	const single = year + 6;
	const x = _.rightFigure(single);
	// 年份的12余数=>地支 补8顺位
	const remainder = (year % 12) + 8;
	const y = remainder % 12;
	return { x, y };
};
