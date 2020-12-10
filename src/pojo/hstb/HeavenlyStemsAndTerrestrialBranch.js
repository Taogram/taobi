/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
<<<<<<< HEAD
 * @LastEditTime: 2020-12-06 17:22:21
=======
 * @LastEditTime: 2020-10-29 10:49:40
>>>>>>> 28e8a2ab606d59d4f479edf40dcfce74aa8b9ca5
 */
const { heavenlyStems, terrestrialBranch } = require("./../Tao");
const _ = require("../../tools/index");
class HeavenlyStemsAndTerrestrialBranch {
	constructor(x = 0, y = 0) {
		// 代表传入的是干支对应数字
		if (arguments.length == 1) {
			const xy = this.__getByUseIndex(x);
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
	__getByUseIndex(index) {
		const x = (index - 1) % 10;
		const y = (index - 1) % 12;
		return { x, y };
	}
}

module.exports = HeavenlyStemsAndTerrestrialBranch;

for (let i = 1; i <= 60; i++) {
	const hstb = new HeavenlyStemsAndTerrestrialBranch(i);
	console.log(hstb.hs(true) + hstb.tb(true));
}
