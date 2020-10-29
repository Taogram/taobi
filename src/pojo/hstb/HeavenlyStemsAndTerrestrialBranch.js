/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 10:49:40
 */
const { heavenlyStems, terrestrialBranch } = require("./../Tao");
const _ = require("../../tools/index");
class HeavenlyStemsAndTerrestrialBranch {
	constructor(x = 0, y = 0) {
		// 代表传入的是干支对应数字
		if (arguments.length == 1) {
			const xy = this.__getByIndex(x);
			this.x = xy.x;
			this.y = xy.y;
		} else {
			this.x = typeof x === "string" ? heavenlyStems.indexOf(x) : x;
			this.y = typeof y === "string" ? terrestrialBranch.indexOf(y) : y;
		}
		this.index = this.__getIndex();
	}
	// 天干序列 Heavenly Stems
	hs(is) {
		return is ? heavenlyStems[this.x] : _.rightFigure(this.index);
	}
	// 地支序列 Terrestrial Branch
	tb(is) {
		return is ? terrestrialBranch[this.y] : Math.floor(this.index / 10);
	}
	// 获得时之旬首
	getLead() {
		const index = Math.floor((this.index - 1) / 10) * 10 + 1;
		return new HeavenlyStemsAndTerrestrialBranch(index);
	}
	// 天干地支对应的序列
	__getIndex() {
		// 个位
		const single = this.x;
		// 十位
		const double =
			(this.x < this.y ? this.x - this.y + 12 : this.x - this.y) / 2;
		return double * 10 + single + 1;
	}
	// 根据序列获取对应x、y
	__getByIndex(index) {
		const str = index - 1 + "";
		const single = ~~str.slice(str.length - 1);
		const double = ~~str.slice(0, str.length - 1);
		const x = single;
		const y = x - double * 2 < 0 ? x - double * 2 + 12 : x - double * 2;
		return { x, y };
	}
}

module.exports = HeavenlyStemsAndTerrestrialBranch;
