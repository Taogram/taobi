/*
 * @Description: 干支历
 * 公式：https://zhuanlan.zhihu.com/p/93508430
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2022-07-19 20:44:05
 */
const moment = require("moment");
const SexagenaryCycle = require("./SexagenaryCycle");
const Algorithm = require("@/algorithm");

/**
 * 干支历时
 */
class Calendar {
	constructor(_obj = moment()) {
		let obj = _obj;

		/**
		 * 时干支
		 * @type {SexagenaryCycle}
		 */
		this.hour;

		if (typeof obj === "string") {
			obj = Array.from(obj.trim());
		}
		if (obj instanceof Array) {
			if (obj.length >= 8) {
				const [y, y_, m, m_, d, d_, h, h_] = obj;
				this.year = new SexagenaryCycle(y, y_);
				this.mouth = new SexagenaryCycle(m, m_);
				this.date = new SexagenaryCycle(d, d_);
				this.hour = new SexagenaryCycle(h, h_);
			} else if (obj.length === 4) {
				const [y, m, d, h] = obj;
				this.year = new SexagenaryCycle(y);
				this.mouth = new SexagenaryCycle(m);
				this.date = new SexagenaryCycle(d);
				this.hour = new SexagenaryCycle(h);
			} else {
				throw new Error(" array length error ");
			}
		}
		if (obj instanceof Date) {
			this.time = moment(obj);
		}
		if (moment.isDate(obj)) {
			this.time = obj;
			this._year = this.time.year();
			this._mouth = this.time.mouth();
			this._date = this.time.date();
			this._hour = this.time.hour();
			this.year = Calendar.getByYear(this._year);
			this.mouth = Calendar.getByMouth(this._year, this._mouth);
			this.date = Calendar.getByDate(this._year, this._mouth, this._date);
			this.hour = Calendar.getByHour(
				this._year,
				this._mouth,
				this._date,
				this._hour
			);
		}
	}

	/**
	 * @description 获取干支历四柱
	 * @param {boolean} is 是否显示汉字
	 * @param {number} level 获取四柱级别 0-3 年->月->日->时
	 * @param {boolean} focus 是否只显示指定的级别
	 */
	sc(is = false, level = 3, focus = false) {
		return [this.year, this.mouth, this.date, this.hour]
			.filter((cstb, i) => {
				if (focus) {
					if (i === level) return true;
				} else if (i <= level) return true;
				return false;
			})
			.map((cstb) => {
				return cstb.cstb(is);
			});
	}

	static setAlgorithm(
		year = Algorithm.year,
		mouth = Algorithm.mouth,
		day = Algorithm.day,
		hour = Algorithm.hour
	) {
		this.algorithm.year = year;
		this.algorithm.mouth = mouth;
		this.algorithm.day = day;
		this.algorithm.hour = hour;
	}

	static getByYear(year) {
		const data = this.algorithm.year(year);
		return new SexagenaryCycle(data);
	}

	static getByMouth(year, mouth) {
		const data = this.algorithm.mouth(year, mouth);
		return new SexagenaryCycle(data);
	}

	static getByDate(year, mouth, date) {
		const data = this.algorithm.date(year, mouth, date);
		return new SexagenaryCycle(data);
	}

	static getByHour(year, mouth, day, hour) {
		const data = this.algorithm.hour(year, mouth, day, hour);
		return new SexagenaryCycle(data);
	}

	// 获取世纪数
	static getCenturyCount(year) {
		return Math.floor(year / 100) + 1;
	}
}

// 设置初始算法
Calendar.algorithm = {};
module.exports = Calendar;
