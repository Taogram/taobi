/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-10-15 23:25:06
 * @LastEditors: lax
 * @LastEditTime: 2021-10-16 00:12:30
 * @FilePath: \taobi\src\pojo\algorithm\mouth.js
 */
const _ = require("@/tools/index");
const getByYear = require("@/pojo/algorithm/year.js");
module.exports = (year, mouth) => {
	// 月份=>地支 12月对应0
	const y = mouth;
	// 年干*2+月地支的个位数=>月天干
	const hs = getByYear(year).x * 2 + y;
	const x = _.rightFigure(hs);
	return { x, y };
};
