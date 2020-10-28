/*
 * @Description: 干支历
 * 公式：https://zhuanlan.zhihu.com/p/93508430
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-28 16:03:09
 */
const gz = require("./HSTB");
const _ = require("../tools/index");
class Calendar {
	constructor(obj) {
		if (obj instanceof Array) {
			this.year = new gz(obj[0][0], obj[0][1]);
			this.mouth = new gz(obj[1][0], obj[1][1]);
			this.day = new gz(obj[2][0], obj[2][1]);
			this.hour = new gz(obj[3][0], obj[3][1]);
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
	hstb(is = false, level = 3, focus = false) {
		return [this.year, this.mouth, this.day, this.hour]
			.filter((gz, i) => {
				if (!focus && i <= level) return true;
				if (focus && i == level) return true;
			})
			.map(gz => {
				return [gz.hs(is), gz.tb(is)];
			});
	}
}
function getByYear(year) {
	// 年份个位数=>天干 补6顺位
	const single = year + 6;
	const tg_index = _.rightFigure(single);
	// 年份的12余数=>地支 补8顺位
	const remainder = (year % 12) + 8;
	const dz_index = remainder % 12;
	return new gz(tg_index, dz_index);
}
function getByMouth(year, mouth) {
	// 月份=>地支 12月对应0
	const dz_index = mouth - 1;
	// 年干*2+月地支的个位数=>月天干
	const hs = getByYear(year).x * 2 + dz_index;
	const tg_index = _.rightFigure(hs);
	return new gz(tg_index, dz_index);
}
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
	return new gz(index);
}

// 获取世纪数
function getCenturyCount(year) {
	return Math.floor(year / 100) + 1;
}

function getByHour(year, mouth, day, hour) {
	// 十二时辰=>十二地支
	const _y = Math.ceil(hour / 2);
	const y = _y == 12 ? 0 : _y;
	// 日天干=>子时时天干
	const single = getByDay(year, mouth, day).x * 2;
	// 再推算实际时天干
	const _x = _.rightFigure(single) + y;
	const x = _.rightFigure(_x);
	return new gz(x, y);
}

Calendar.getByYear = getByYear;
Calendar.getByMouth = getByMouth;
Calendar.getByDay = getByDay;
Calendar.getCenturyCount = getCenturyCount;
Calendar.getByHour = getByHour;

module.exports = Calendar;
