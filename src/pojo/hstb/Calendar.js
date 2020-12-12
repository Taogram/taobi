/*
 * @Description: 干支历
 * 公式：https://zhuanlan.zhihu.com/p/93508430
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-12-12 23:10:49
 */
const HSTB = require("./HeavenlyStemsAndTerrestrialBranch");
const _ = require("../../tools/index");
class Calendar {
	constructor(obj) {
		if (obj instanceof Array) {
			this.year = new HSTB(obj[0][0], obj[0][1]);
			this.mouth = new HSTB(obj[1][0], obj[1][1]);
			this.day = new HSTB(obj[2][0], obj[2][1]);
			this.hour = new HSTB(obj[3][0], obj[3][1]);
		} else {
			this.date = obj || new Date();

			const year = this.date.getFullYear();
			const mouth = this.date.getMonth() + 1;
			const day = this.date.getDate();
			const hour = this.date.getHours();

			this.year = getByYear(year);
			this.mouth = getByMouth(year, mouth);
			this.day = getByDay(year, mouth, day);
			this.hour = getByHour(year, mouth, day, hour);
		}
	}
	/**
	 * @description 获取干支历四柱
	 * @param {boolean} is 是否显示汉字
	 * @param {number} level 获取四柱级别 0-3 年->月->日->时
	 * @param {boolean} focus 是否只显示指定的级别
	 */
	hstb(is = false, level = 3, focus = false) {
		return [this.year, this.mouth, this.day, this.hour]
			.filter((hstb, i) => {
				if (!focus && i <= level) return true;
				if (focus && i == level) return true;
			})
			.map(hstb => {
				return [hstb.hs(is), hstb.tb(is)];
			});
	}
}
function getByYear(year) {
	// 年份个位数=>天干 补6顺位
	const single = year + 6;
	let tg_index = _.rightFigure(single);
	// 年份的12余数=>地支 补8顺位
	const remainder = (year % 12) + 8;
	let dz_index = remainder % 12;
	return new HSTB(++tg_index, ++dz_index);
}
function getByMouth(year, mouth) {
	// 月份=>地支 12月对应0
	const dz_index = mouth;
	// 年干*2+月地支的个位数=>月天干
	const hs = getByYear(year).x * 2 + dz_index;
	const tg_index = _.rightFigure(hs);
	return new HSTB(tg_index, dz_index);
}
/**
 *
 * @param {*} _year
 * @param {*} _mouth 1-12
 * @param {*} day
 */
function getByDay(_year, _mouth, day) {
	// 月份为13、14月
	const mouth = 3 > _mouth > 0 ? _mouth + 12 : _mouth;
	const year = 3 > _mouth > 0 ? _year - 1 : _year;
	// 世纪数
	const century = getCenturyCount(year);
	// 年数 = 此纪年2月末的日干支序数
	const x = (44 * (century - 1) + Math.floor((century - 1) / 4) + 9) % 60;
	// 月数
	const m =
		(30 * (Math.pow(-1, mouth) + 1)) / 2 + Math.floor((3 * mouth - 7) / 5);
	// figure
	const figure = Math.floor(_.rightFigure(year, 2) / 4);
	//日干支序数 = 年数+月数+日期 （和大于60，则减60。1月、2月用上一年的年数）
	let index =
		(figure * 6 +
			5 * (figure * 3 + (_.rightFigure(year, 2) % 4)) +
			x +
			m +
			day) %
		60;
	index = index == 0 ? 60 : index;
	return new HSTB(index);
}

// 获取世纪数
function getCenturyCount(year) {
	return Math.floor(year / 100) + 1;
}

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
function getByHour(year, mouth, day, hour) {
	// 十二时辰=>十二地支
	// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12
	const _y = Math.ceil(hour / 2);
	// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 0
	let y = _y % 12;
	// 日天干=>子时时天干
	// 0 2 4 6 8
	const single = (getByDay(year, mouth, day).x * 2) % 10;
	// 推算实际时天干
	const _x = single + _y;
	let x = _x % 10;
	return new HSTB(++x, ++y);
}

Calendar.getByYear = getByYear;
Calendar.getByMouth = getByMouth;
Calendar.getByDay = getByDay;
Calendar.getCenturyCount = getCenturyCount;
Calendar.getByHour = getByHour;

module.exports = Calendar;
