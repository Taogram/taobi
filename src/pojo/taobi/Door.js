/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-06-03 16:19:08
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:13:52
 */
const { Phases } = require("tao_taichi.js");
const { DOOR, DOOR_ARR } = require("tao_name");
const DOOR_PHASES = ["水", "土", "木", "木", "", "金", "金", "土", "火"];
class Door extends Phases {
	constructor(index) {
		if (index instanceof Door) return index;
		const i = ~~(index + 1) === 0 ? DOOR_ARR.indexOf(index) : ~~index % 9;
		if (i < 0) throw new Error("arg can`t be use");
		if (i === 4) throw new Error("中宫无门");
		// 1,4,2,2,,0,0,4,3
		super(DOOR_PHASES[i], null);
		this.index = i;
	}

	getIndex(is = false) {
		return is ? DOOR_ARR[this.index] : this.index;
	}

	// TODO 门+门
}
Door.DOOR = DOOR;
Door.DOOR_ARR = DOOR_ARR;
module.exports = Door;
