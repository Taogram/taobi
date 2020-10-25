/*
 * @Description:
 * 公式：https://baike.baidu.com/item/%E6%97%A5%E6%9F%B1%E5%85%AC%E5%BC%8F/18780172?fr=aladdin
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-26 00:36:02
 */
const gz = require("./GanZhi");
class Eight {
	constructor(p = {}) {
		this.date = p.date || this.time();
		this.year = this.getYear();
		this.mouth = this.getMonth();
		this.day = this.getDay();
		this.hour = this.getHour();
	}
	getYear(year) {
		// 年份+6的个位数即对应天干
		const year_value = year || this.date.getFullYear();
		const single = year_value + 6;
		const tg_index = this.__RightFigure(single);
		// 年份的12余数+6对应地支
		const remainder = (year_value % 12) + 6;
		const dz_index = this.__RightFigure(remainder);
		return new gz(tg_index, dz_index);
	}
	getMonth() {
		const mouth_index = this.date.getMonth() + 1;
		// 月份对应地支 12月对应0
		const dz_index = mouth_index;
		// 年干*2+月地支的个位数为月天干
		const hs = this.year.x * 2 + dz_index;
		const tg_index = this.__RightFigure(hs);
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
		const figure = Math.floor(this.__RightFigure(year, 2) / 4);
		//日干支序数 = 年数+月数+日期 （和大于60，则减60。1月、2月用上一年的年数）
		let index =
			(figure * 6 +
				5 * (figure * 3 + (this.__RightFigure(year, 2) % 4)) +
				x +
				m +
				this.date.getDate()) %
			60;
		index == 0 ? 60 : index;
		return new gz(index);
	}
	getCenturyCount(year) {
		return Math.floor(year / 100) + 1;
	}
	getHour() {
		// 十二时辰对应十二地支
		const _y = Math.ceil(this.date.getHours() / 2);
		const y = _y == 12 ? 0 : _y;
		// 根据日天干推算子时时天干
		const single = this.day.x * 2;
		// 再推算实际时天干
		const _x = this.__RightFigure(single) + y;
		const x = this.__RightFigure(_x);
		return new gz(x, y);
	}
	result() {
		return [
			this.year.getXContent(),
			this.year.getYContent(),
			this.mouth.getXContent(),
			this.mouth.getYContent(),
			this.day.getXContent(),
			this.day.getYContent(),
			this.hour.getXContent(),
			this.hour.getYContent()
		];
	}
	time() {
		return new Date();
	}
	__RightFigure(num, index = 1) {
		const _num = num + "";
		return ~~_num.slice(_num.length - index);
	}
}
module.exports = Eight;
const eight = new Eight();
console.log(eight.result());
