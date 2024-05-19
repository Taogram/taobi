/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-06-03 16:19:08
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:26:56
 */
const { Phases } = require("tao_taichi.js");
const { STAR, STAR_ARR } = require("tao_name");
class Star extends Phases {
	constructor(index) {
		if (index instanceof Star) return index;
		const i = ~~(index + 1) === 0 ? STAR_ARR.indexOf(index) : ~~index % 9;
		if (i < 0) throw new Error("arg can`t be use");
		/**
		 * 五行先天序数 水火木金土
		 * 九星五行 042243341
		 * 首尾分水火
		 * 隔二取土
		 * 双木双金
		 */
		const phases =
			i === 0 ? 0 : i % 8 === 0 ? 1 : i % 3 === 1 ? 4 : ~~(i / 2) === 1 ? 2 : 3;
		// TODO 阴阳属性未处理
		super(phases, null);
		this.index = i;
	}

	getIndex(is = false) {
		return is ? STAR_ARR[this.index] : this.index;
	}

	// TODO
}
Star.STAR = STAR;
Star.STAR_ARR = STAR_ARR;
module.exports = Star;
