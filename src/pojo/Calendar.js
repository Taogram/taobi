/*
 * @Description: 干支历
 * 公式：https://zhuanlan.zhihu.com/p/93508430
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-26 23:48:49
 */
const gz = require("./HSTB");
const _ = require("../tools/index");
class Calendar {
	constructor(p = {}) {
		this.date = p.date || this.time();
		this.year = this.getYear();
		this.mouth = this.getMonth();
		this.day = this.getDay();
		this.hour = this.getHour();
	}
	getYear(year) {
		// 年份个位数=>天干 补6顺位
		const year_value = year || this.date.getFullYear();
		const single = year_value + 6;
		const tg_index = _.rightFigure(single);
		// 年份的12余数=>地支 补6顺位
		const remainder = (year_value % 12) + 6;
		const dz_index = _.rightFigure(remainder);
		return new gz(tg_index, dz_index);
	}
	getMonth() {
		const mouth_index = this.date.getMonth() + 1;
		// 月份=>地支 12月对应0
		const dz_index = mouth_index;
		// 年干*2+月地支的个位数=>月天干
		const hs = this.year.x * 2 + dz_index;
		const tg_index = _.rightFigure(hs);
		return new gz(tg_index, dz_index);
	}
	getDay() {
		// 实际月份
		let mouth = this.date.getMonth() + 1;
		// 实际年份
		const year = this.date.getFullYear();
		// 月份为13、14月
		mouth = 4 > mouth > 1 ? mouth + 12 : mouth;
		// 世纪数
		const century = this.getCenturyCount(year);
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
				this.date.getDate()) %
			60;
		index == 0 ? 60 : index;
		return new gz(index);
	}
	// 获取世纪数
	getCenturyCount(year) {
		return Math.floor(year / 100) + 1;
	}
	getHour() {
		// 十二时辰=>十二地支
		const _y = Math.ceil(this.date.getHours() / 2);
		const y = _y == 12 ? 0 : _y;
		// 日天干=>子时时天干
		const single = this.day.x * 2;
		// 再推算实际时天干
		const _x = _.rightFigure(single) + y;
		const x = _.rightFigure(_x);
		return new gz(x, y);
	}
	result() {
		return [
			this.year.getHS(),
			this.year.getTB(),
			this.mouth.getHS(),
			this.mouth.getTB(),
			this.day.getHS(),
			this.day.getTB(),
			this.hour.getHS(),
			this.hour.getTB()
		];
	}
	time() {
		return new Date();
	}
}
module.exports = Calendar;
const calendar = new Calendar({ date: new Date(2020, 9, 7) });
console.log(calendar.result());
