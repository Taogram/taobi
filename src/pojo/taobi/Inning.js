/*
 * @Description: 九宫盘
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-10 23:14:51
 * @LastEditors: lax
 * @LastEditTime: 2020-12-15 22:15:12
 * @FilePath: \taobi\src\pojo\taobi\Inning.js
 */
const Palace = require("./Palace");
const { ceremony } = require("../Tao");
class Inning {
	constructor(round) {
		this.round = round;
		this._acquired = [
			new Palace({ index: 1, rIndex: 0 }),
			new Palace({ index: 2, rIndex: 5 }),
			new Palace({ index: 3, rIndex: 2 }),
			new Palace({ index: 4, rIndex: 3 }),
			new Palace({ index: 5, rIndex: null }),
			new Palace({ index: 6, rIndex: 7 }),
			new Palace({ index: 7, rIndex: 6 }),
			new Palace({ index: 8, rIndex: 1 }),
			new Palace({ index: 9, rIndex: 4 })
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
		this.ont = [
			[this._acquired[3], this._acquired[8], this._acquired[1]],
			[this._acquired[2], this._acquired[4], this._acquired[6]],
			[this._acquired[7], this._acquired[0], this._acquired[5]]
		];
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
	/**
	 * @private
	 * @description 内部函数，输出指定属性的序列
	 * @param {string} method 属性名称
	 */
	__to(method) {
		return this.ont.map(row => {
			return row.map(p => {
				return p[method]();
			});
		});
	}

	/**
	 * @description 输出用局之三奇六仪
	 */
	toRound() {
		return this.__to("getHS");
	}

	/**
	 * @description 输出该盘
	 */
	toName() {
		return this.__to("getName");
	}
}
module.exports = Inning;
