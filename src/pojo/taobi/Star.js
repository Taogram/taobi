/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-06-03 16:19:08
 * @LastEditors: lax
 * @LastEditTime: 2023-07-22 10:36:37
 */
const { Phases } = require("tao_taichi.js");
const STAR = [
	"天蓬星",
	"天芮星",
	"天冲星",
	"天辅星",
	"天禽星",
	"天心星",
	"天柱星",
	"天任星",
	"天英星",
];
const STAR_PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
class Star extends Phases {
	constructor(index) {
		if (index instanceof Star) return index;
		const i = ~~(index + 1) === 0 ? STAR.indexOf(index) : ~~index % 9;
		if (i < 0) throw new Error("arg can`t be use");
		super(STAR_PHASES[i], null);
		this.index = i;
	}

	getIndex(is = false) {
		return is ? STAR[this.index] : this.index;
	}

	// TODO
}
Star.STAR = STAR;
module.exports = Star;
