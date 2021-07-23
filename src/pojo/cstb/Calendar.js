/*
 * @Description: 干支历
 * 公式：https://zhuanlan.zhihu.com/p/93508430
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2021-07-23 23:36:18
 */
const CSTB = require("./SexagenaryCycle");

const _ = require("../../tools/index");

class Calendar {
	constructor(obj = new Date()) {
		let yearX;
		let yearY;
		let mouthX;
		let mouthY;
		let dayX;
		let dayY;
		let hourX;
		let hourY;
		if (typeof obj === "string") {
			const _obj = obj.trim();
			yearX = _obj[0];
			yearY = _obj[1];
			mouthX = _obj[2];
			mouthY = _obj[3];
			dayX = _obj[4];
			dayY = _obj[5];
			hourX = _obj[6];
			hourY = _obj[7];
			this.year = new CSTB(yearX, yearY);
			this.mouth = new CSTB(mouthX, mouthY);
			this.day = new CSTB(dayX, dayY);
			this.hour = new CSTB(hourX, hourY);
		}
		if (obj instanceof Date) {
			this.date = obj;

			const year = obj.getFullYear();
			const mouth = obj.getMonth() + 1;
			const day = obj.getDate();
			const hour = obj.getHours();

			this.year = this.getByYear(year);
			this.mouth = this.getByMouth(year, mouth);
			this.day = this.getByDay(year, mouth, day);
			this.hour = this.getByHour(year, mouth, day, hour);
		}

		// 设置初始算法
		this.algorithm = {
			yearAlgorithm: (year) => {
				// 年份个位数=>天干 补6顺位
				const single = year + 6;
				const x = _.rightFigure(single);
				// 年份的12余数=>地支 补8顺位
				const remainder = (year % 12) + 8;
				const y = remainder % 12;
				return { x, y };
			},
			mouthAlgorithm: () => {},
			dayAlgorithm: () => {},
			hourAlgorithm: () => {},
		};
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
				if (focus && i === level) return true;
				return false;
			})
			.map((hstb) => {
				return hstb.hstb(is);
			});
	}

	static algorithm(year, mouth, day, hour) {
		this.algorithm.year = year;
		this.algorithm.mouth = mouth;
		this.algorithm.day = day;
		this.algorithm.hour = hour;
	}

	static getByYear(year) {
		const { x, y } = this.algorithm.yearAlgorithm(year);
		return new CSTB(x, y);
	}

	static getByMouth(year, mouth) {
		// 月份=>地支 12月对应0
		const y = mouth;
		// 年干*2+月地支的个位数=>月天干
		const hs = this.getByYear(year).x * 2 + y;
		const x = _.rightFigure(hs);
		return new CSTB(x, y);
	}

	/**
	 *
	 * @param {*} _year
	 * @param {*} _mouth 1-12
	 * @param {*} day
	 */
	static getByDay(_year, _mouth, day) {
		// 月份为13、14月
		const mouth = _mouth < 3 > 0 ? _mouth + 12 : _mouth;
		const year = _mouth < 3 > 0 ? _year - 1 : _year;
		// 世纪数
		const century = this.getCenturyCount(year);
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
				day) %
			60;
		index = index === 0 ? 60 : index;
		return new CSTB(index);
	}

	// 获取世纪数
	static getCenturyCount(year) {
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
	static getByHour(year, mouth, day, hour) {
		// 十二时辰=>十二地支
		// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12
		const _y = Math.ceil(hour / 2);
		// 0 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 0
		const y = _y % 12;
		// 日天干=>子时时天干
		// 0 2 4 6 8
		const single = (this.getByDay(year, mouth, day).x * 2) % 10;
		// 推算实际时天干
		const _x = single + _y;
		const x = _x % 10;
		return new CSTB(x, y);
	}
}

module.exports = Calendar;
