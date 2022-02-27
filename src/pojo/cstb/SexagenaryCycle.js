/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2022-02-27 18:47:39
 */
const { celestialStems, terrestrialBranches } = require("@/pojo/Tao.js");

class SexagenaryCycle {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.index;
		if (arguments.length === 1) {
			if (x instanceof SexagenaryCycle) return x;
			this.__getByOneArg(x);
		}
		this.__getByTwoArg(this.x, this.y);
	}

	// 天干序列 Celestial Stems->0-9
	cs(is) {
		return is ? celestialStems[this.x] : this.x;
	}

	// 地支序列 Terrestrial Branches->0-11
	tb(is) {
		return is ? terrestrialBranches[this.y] : this.y;
	}

	// 天干地支序列 0-59
	cstb(is) {
		return is ? this.cs(is) + this.tb(is) : this.index;
	}

	// 获得旬首
	getLead() {
		const index = ~~(this.index / 10) * 10;
		return new SexagenaryCycle(index);
	}

	// 获取隐旗
	getHide() {
		const row = ~~(this.getLead().index / 10);
		return row;
	}
	// 天干地支对应的序列

	/*
		  x:0		x:1		x:2		x:3 	x:4 	x:5 	x:6 	x:7 	x:8 	x:9
		0 00/00		01/00	02/00	03/00	04/00	05/00	06/00	07/00	08/00	09/00	
		1 10/10		11/10	00/-2	01/-2	02/-2	03/-2	04/-2	05/-2	06/-2	07/-2
		2 08/08		09/08	10/08	11/08	00/-4	01/-4	02/-4	03/-4	04/-4	05/-4
		3 06/06		07/06	08/06	09/06	10/06	11/06	00/-6	01/-6	02/-6	03/-6
		4 04/04		05/04	06/04	07/04	08/04	09/04	10/04	11/04	00/-8	01/-8
		5 02/02		03/02	04/02	05/02	06/02	07/02	08/02	09/02	10/02	11/02
	*/
	__getIndex() {
		if (this.x === -1 || this.y === -1)
			throw new Error(`can\`t use this arg by x:${this.x} y:${this.y}`);
		// 干支相差之数（负按12转正）/2 = 6-干支十位数值
		const difference = this.y - this.x;
		const index = (difference < 0 ? difference + 12 : difference) / 2;
		const tensPlace = index === 0 ? 0 : 6 - index;
		return tensPlace * 10 + this.x;
	}

	/**
	 * @method
	 * @description 根据一个序列获取干支
	 * @param {*} arg
	 */
	__getByIndex(_arg) {
		// 参数为数 取值范围0-59
		const arg = Math.abs(_arg % 60);
		// result-> 0-9 -> celestialStems.index
		const x = arg % 10;
		// result-> 0-11 -> terrestrialBranches.index
		const y = arg % 12;
		// result-> 0-59
		this.x = x;
		this.y = y;
		this.index = arg;
		return { x, y, index: arg };
	}

	__getByOneArg(_arg) {
		let arg = _arg;
		if (typeof _arg === "string") {
			if (~~(_arg + 1)) {
				arg = ~~_arg;
			} else if (_arg.length === 2) {
				arg = Array.from(_arg);
			}
		}
		if (arg instanceof Array) {
			this.x = arg[0];
			this.y = arg[1];
		} else if (typeof arg === "object") {
			this.x = arg.x;
			this.y = arg.y;
		} else if (typeof arg === "number") {
			this.__getByIndex(arg);
		} else {
			throw new Error("this arg can't to use");
		}
	}

	__getByTwoArg(arg1, arg2) {
		// TODO 当传入两个参数时判断是否存在对应干支
		this.x = ~~(arg1 + 1) === 0 ? celestialStems.indexOf(arg1) : ~~arg1 % 10;
		this.y =
			~~(arg2 + 1) === 0 ? terrestrialBranches.indexOf(arg2) : ~~arg2 % 12;
		this.index = this.__getIndex();
	}
}

module.exports = SexagenaryCycle;
