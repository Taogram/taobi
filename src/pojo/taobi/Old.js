/*
 * @Description: 奇门遁甲对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2022-02-27 15:05:26
 */
const Palace = require("./Palace");
const Calendar = require("../cstb/Calendar");
// const _ = require("./../../tools/index");
const Earth = require("./Earth");
const Heaven = require("./Heaven");
const { star, acquired } = require("../Tao");
// const HSTB = require("../hstb/HeavenlyStemsAndTerrestrialBranch");
class TheArtOfBecomingInvisible {
	constructor(round, calendar) {
		// 干支历
		this.calendar = new Calendar(calendar);

		/**
		 * 用局：
		 * -9~9对应阴遁九局、阳遁九局
		 */
		this.round = round || this.getRound();

		this.earth = new Earth(this.round);

		this.heaven = new Heaven(this.earth, this.calendar.hour);

		// 内置九宫对象，按后天卦序排列
		this._acquired = [
			new Palace(null, { pIndex: 1, rIndex: 0 }),
			new Palace(null, { pIndex: 2, rIndex: 5 }),
			new Palace(null, { pIndex: 3, rIndex: 2 }),
			new Palace(null, { pIndex: 4, rIndex: 3 }),
			new Palace(null, { pIndex: 5, rIndex: null }, star[4]),
			new Palace(null, { pIndex: 6, rIndex: 7 }),
			new Palace(null, { pIndex: 7, rIndex: 6 }),
			new Palace(null, { pIndex: 8, rIndex: 1 }),
			new Palace(null, { pIndex: 9, rIndex: 4 }),
		];
		// 内置八宫对象，按天盘星序排列
		this._circle = [
			this._acquired[0],
			this._acquired[7],
			this._acquired[2],
			this._acquired[3],
			this._acquired[8],
			this._acquired[1],
			this._acquired[6],
			this._acquired[5],
		];
		// 九宫对象
		this.ont = [
			[this._acquired[3], this._acquired[8], this._acquired[1]],
			[this._acquired[2], this._acquired[4], this._acquired[6]],
			[this._acquired[7], this._acquired[0], this._acquired[5]],
		];
		this.__init();
	}

	__init() {
		this.__setSurpriseAndCeremonyByRound();
		this.__setStarByHourAndRound();
		this.__setTrigrams();
	}

	__setTrigrams() {
		this._acquired.map((p, i) => {
			p.setTrigrams(acquired[i]);
		});
	}

	getRound() {}

	/**
	 * @description 输出用局之三奇六仪
	 */
	toRound() {
		return this.__to("hs");
	}

	/**
	 * @description 输出星序
	 */

	toStar() {
		return this.__to("star");
	}

	/**
	 * @private
	 * @description 内部函数，输出指定属性的序列
	 * @param {string} method 属性名称
	 */
	__to(method) {
		return this.ont.map((row) => {
			return row.map((p) => {
				return p[method];
			});
		});
	}

	/**
	 * @private
	 * @description 内部函数，每一个宫的回调函数
	 * @param {function} callback 回调函数
	 * @param {array} arr 二维数组
	 */
	__each(callback, arr = this.ont) {
		return arr.map((row, i) => {
			return row.map((p, j) => {
				callback(p, i, j);
			});
		});
	}
}

module.exports = TheArtOfBecomingInvisible;
