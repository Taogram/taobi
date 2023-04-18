/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2023-04-18 21:06:30
 */

const { ceremony, CELESTIAL_STEMS } = require("@/pojo/Tao");
const { SexagenaryCycle } = require("tao_calendar");

/**
 * 获取隐旗
 * @param {boolean} is
 * @returns 名称/序号
 */
SexagenaryCycle.prototype.getConceal = function (is) {
	const row = ~~(this.getLead().index / 10);
	return is ? ceremony[row] : row;
};

/**
 * 获取天干对应的旗
 * @param {boolean} is
 * @returns 名称/序号
 */
SexagenaryCycle.prototype.getCsOrigin = function (is) {
	// 时干
	let cs = this.cs(is);
	// 如果本身是旬首则选所隐旗
	if (cs === CELESTIAL_STEMS.METH || cs === 0) cs = this.getConceal(is);
	return cs;
};
