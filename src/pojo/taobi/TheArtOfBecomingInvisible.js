/*
 * @Description: 奇门遁甲对象
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 00:30:59
 */
const Palace = require("./Palace");
// const Calendar = require("../hstb/Calendar");
const _ = require("./../../tools/index");
const { ceremony, surprise, star, starOrder } = require("../Tao");
// const HSTB = require("../hstb/HeavenlyStemsAndTerrestrialBranch");
class TheArtOfBecomingInvisible {
	constructor(p = {}) {
		// 干支历
		this.calendar = p.calendar;

		/**
		 * 用局：
		 * -9~9对应阴遁九局、阳遁九局
		 */
		this.round = p.round || this.getRound();

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
		this.__init(p);
	}
	__init(p) {
		this.__setSCByRound();
		this.__setStar();
		this.__concat(p);
	}

	/**
	 * @description 合并
	 * @param {*} p
	 */
	__concat(p) {
		this.__each((palace, i, j) => {
			if (p.roundMap) palace.setHS(p.roundMap[i][j]);
			if (p.starMap) palace.setStar(p.starMap[i][j]);
		});
	}

	/**
	 * @private
	 * @description 安用局布三奇六仪
	 */
	__setSCByRound() {
		const self = this;
		this.__each((name, i, j) => {
			self.ont[i][j].setHS(name);
		}, getSurpriseAndCeremonyByRound(this.round, false));
	}

	/**
	 * @private
	 * @description 按用局布天盘星数
	 */
	__setStar() {
		const self = this;
		this.__each((name, i, j) => {
			self.ont[i][j].setStar(name);
		}, getStarByHourAndRound(this.round, false));
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

/**
 * @description 根据用局排三奇六仪
 * @param {number} round
 * @param {boolean} is 输出结果是否为对象
 */
function getSurpriseAndCeremonyByRound(round, is = true) {
	const _list = [];
	// 为奇门之三奇六仪固定顺序
	const order = ceremony.concat(surprise);
	// 阴逆序
	const negative = [8, 7, 6, 5, 4, 3, 2, 1, 0];
	// 定位打头
	const num = _.arrayUp(negative, 9 - (Math.abs(round) % 9));

	order.map((x, i) => {
		_list[round < 0 ? num[i] : (round - 1 + i) % 9] = x;
	});
	const map = [
		[_list[3], _list[8], _list[1]],
		[_list[2], _list[4], _list[6]],
		[_list[7], _list[0], _list[5]]
	];
	const result = is ? new TheArtOfBecomingInvisible({ roundMap: map }) : map;
	return result;
}

/**
 * @description 安时及用局获取星序
 * @param {HeavenlyStemsAndTerrestrialBranch} hour 时干支
 * @param {number} round 所用局
 * @param {boolean} is 输出结果是否为对象
 */
function getStarByHourAndRound(hour, round, is = true) {
	const list = getSurpriseAndCeremonyByRound(round);
	// 时之旬首对应宫
	const palace = list.getPalaceByHour(hour.getLead());
	// 时天干之对应宫
	const _palace = list.getPalaceByHour(hour);
	// 设置值符
	_palace.setSymbol(true);
	// 布天盘之星数
	list._circle.map((p, i) => {
		p.setStar(
			starOrder[(8 - Math.abs(_palace.rIndex - palace.rIndex) + i) % 8]
		);
	});
	return is ? list : list.toStar();
}

TheArtOfBecomingInvisible.getSCByRound = getSurpriseAndCeremonyByRound;
TheArtOfBecomingInvisible.getStarByHourAndRound = getStarByHourAndRound;

module.exports = TheArtOfBecomingInvisible;
