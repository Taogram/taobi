/*
 * @Description: 奇门遁甲对象
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 01:01:21
 */
const Palace = require("./Palace");
const Calendar = require("../hstb/Calendar");
const _ = require("./../../tools/index");
const { ceremony, surprise, star, starOrder } = require("../Tao");
// const HSTB = require("../hstb/HeavenlyStemsAndTerrestrialBranch");
class TheArtOfBecomingInvisible {
	constructor(round, calendar = new Calendar()) {
		// 干支历
		this.calendar = calendar;

		/**
		 * 用局：
		 * -9~9对应阴遁九局、阳遁九局
		 */
		this.round = round || this.getRound();

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
			new Palace(null, { pIndex: 9, rIndex: 4 })
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
			this._acquired[5]
		];
		// 九宫对象
		this.ont = [
			[this._acquired[3], this._acquired[8], this._acquired[1]],
			[this._acquired[2], this._acquired[4], this._acquired[6]],
			[this._acquired[7], this._acquired[0], this._acquired[5]]
		];
		this.__init();
	}
	__init() {
		this.__getSurpriseAndCeremonyByRound();
		this.__getStarByHourAndRound();
	}

	/**
	 * @private
	 * @description 安用局排三奇六仪
	 */
	__getSurpriseAndCeremonyByRound() {
		// 用局
		const round = this.round;

		// 为奇门之三奇六仪固定顺序
		const order = ceremony.concat(surprise);
		// 阴逆序
		const negative = [8, 7, 6, 5, 4, 3, 2, 1, 0];
		// 定位打头
		const num = _.arrayUp(negative, 9 - (Math.abs(round) % 9));

		order.map((x, i) => {
			this._acquired[round < 0 ? num[i] : (round - 1 + i) % 9].setHS(x);
		});
	}

	/**
	 * @private
	 * @description 安时及用局获取星序
	 */
	__getStarByHourAndRound() {
		// 时
		const hour = this.calendar.hour;
		// 时之旬首对应宫
		const palace = this.getPalaceByHour(hour.getLead());
		// 时天干之对应宫
		const _palace = this.getPalaceByHour(hour);
		// 设置值符
		_palace.setSymbol(true);
		// 布天盘之星数
		this._circle.map((p, i) => {
			p.setStar(
				starOrder[(8 - Math.abs(_palace.rIndex - palace.rIndex) + i) % 8]
			);
		});
	}

	/**
	 * @description 按时推宫
	 * @param {HeavenlyStemsAndTerrestrialBranch} hour
	 */
	getPalaceByHour(hour) {
		// 天干为甲，则取其将隐之仪
		const _ceremony =
			hour.hs(true) == "甲" ? ceremony[hour.tb()] : hour.hs(true);
		return this._acquired.filter(p => {
			if (p.hs == _ceremony) return true;
		})[0];
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
		return this.ont.map(row => {
			return row.map(p => {
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
