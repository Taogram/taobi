/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-10-15 23:25:20
 * @LastEditors: lax
 * @LastEditTime: 2021-10-16 00:15:07
 * @FilePath: \taobi\src\pojo\algorithm\hour.js
 */

/**
 * 甲己还加甲,乙庚丙作初;
 * 丙辛从戊起,丁壬庚子居;
 * 戊癸何方法,壬子是真途;
 *
 * 0 1 2 3 4 -> 0 2 4 6 8
 * 5 6 7 8 9 -> 10 12 14 16 18
 * result: 0 2 4 6 8
 * @param {*} year
 * @param {*} mouth
 * @param {*} day
 * @param {*} hour (0-23)
 */
const getByDate = require("@/algorithm/date.js");
module.exports = (year, mouth, day, hour) => {
	// 十二时辰=>十二地支
	// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12
	const _y = Math.ceil(hour / 2);
	// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 0
	const y = _y % 12;
	// 日天干=>子时时天干
	// 0 2 4 6 8
	const single = (getByDate(year, mouth, day).x * 2) % 10;
	// 推算实际时天干
	const _x = single + _y;
	const x = _x % 10;
	return { x, y };
};
