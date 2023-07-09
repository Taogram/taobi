/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-06-03 16:19:08
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 19:47:20
 */
const { Phases } = require("tao_taichi.js");
const DIVINITY = [
	"值符",
	"螣蛇",
	"太阴",
	"六合",
	"白虎",
	"玄武",
	"九地",
	"九天",
];
const DIVINITY_PHASES = ["土", "火", "金", "木", "金", "水", "土", "金"];
class Divinity extends Phases {
	constructor(index) {
		if (index instanceof Divinity) return index;
		const i = ~~(index + 1) === 0 ? DIVINITY.indexOf(index) : ~~index % 8;
		if (i < 0) throw new Error("arg can`t be use");
		super(DIVINITY_PHASES[i], null);
		this.index = i;
	}

	getIndex(is = false) {
		return is ? DIVINITY[this.index] : this.index;
	}

	// TODO
}
Divinity.DIVINITY = DIVINITY;
module.exports = Divinity;
