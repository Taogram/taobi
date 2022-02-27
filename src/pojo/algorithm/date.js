/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-10-15 23:25:13
 * @LastEditors: lax
 * @LastEditTime: 2021-10-16 00:14:21
 * @FilePath: \taobi\src\pojo\algorithm\day.js
 */
const _ = require("@/tools/index");
function getCenturyCount(year) {
	return Math.floor(year / 100) + 1;
}
module.exports = (_year, _mouth, date) => {
	// 月份为13、14月
	const mouth = _mouth < 3 > 0 ? _mouth + 12 : _mouth;
	const year = _mouth < 3 > 0 ? _year - 1 : _year;
	// 世纪数
	const century = getCenturyCount(year);
	// 年数 = 此纪年2月末的日干支序数
	const x = (44 * (century - 1) + Math.floor((century - 1) / 4) + 9) % 60;
	// 月数
	const m = (30 * (-1) ** mouth + 1) / 2 + Math.floor((3 * mouth - 7) / 5);
	// figure
	const figure = Math.floor(_.rightFigure(year, 2) / 4);
	// 日干支序数 = 年数+月数+日期 （和大于60，则减60。1月、2月用上一年的年数）
	let index =
		(figure * 6 +
			5 * (figure * 3 + (_.rightFigure(year, 2) % 4)) +
			x +
			m +
			date) %
		60;
	index = index === 0 ? 60 : index;
	return index;
};
