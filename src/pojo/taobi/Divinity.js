/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-06-03 16:19:08
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:10:58
 */
const { Phases } = require("tao_taichi.js");
const { DIVINITY_ARR, DIVINITY } = require("tao_name");
const DIVINITY_PHASES = ["土", "火", "金", "木", "金", "水", "土", "金"];
class Divinity extends Phases {
	constructor(index) {
		if (index instanceof Divinity) return index;
		const i = ~~(index + 1) === 0 ? DIVINITY_ARR.indexOf(index) : ~~index % 8;
		if (i < 0) throw new Error("arg can`t be use");
		super(DIVINITY_PHASES[i], null);
		this.index = i;
	}

	getIndex(is = false) {
		return is ? DIVINITY_ARR[this.index] : this.index;
	}

	// TODO
}
Divinity.DIVINITY_ARR = DIVINITY_ARR;
Divinity.DIVINITY = DIVINITY;
module.exports = Divinity;
