/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2021-07-21 22:56:07
 */
const { celestialStems, terrestrialBranches } = require("../Tao");

class SexagenaryCycle {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.index;
		if (arguments.length === 1) {
			this.__getByOneArg(x);
		}
		this.__getByTwoArg(this.x, this.y);
	}

	// 天干序列 Heavenly Stems->0-9
	hs(is) {
		return is ? celestialStems[this.x] : this.x;
	}

	// 地支序列 Terrestrial Branch->0-11
	tb(is) {
		return is ? terrestrialBranches[this.y] : this.y;
	}

	// 天干地支序列 0-59
	hstb(is) {
		return is ? this.hs(is) + this.tb(is) : this.index;
	}

	// 获得旬首
	getLead() {
		const index = ~~(this.index / 10) * 10 + 1;
		return new SexagenaryCycle(index);
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
	__getByIndex(arg) {
		// 参数为数 取值范围0-59
		if (arg < 0 || arg > 59) throw new Error("the number must between 0-59");
		// result-> 0-9 -> heavenlyStems.index
		this.x = arg % 10;
		// result-> 0-11 -> terrestrialBranch.index
		this.y = arg % 12;
		// result-> 0-59
		this.index = arg;
	}

	__getByOneArg(arg) {
		if (typeof arg === "object") {
			this.x = arg.x;
			this.y = arg.y;
		}
		if (arg instanceof Array) {
			this.x = arg[0];
			this.y = arg[1];
		}
		if (typeof arg === "string") {
			if (~~(arg + 1)) {
				this.__getByIndex(~~arg);
			} else if (arg.length === 2) {
				const arr = Array.from(arg);
				this.x = arr[0];
				this.y = arr[1];
			}
		}
		if (typeof arg === "number") {
			this.__getByIndex(arg);
		}
	}

	__getByTwoArg(arg1, arg2) {
		// TODO 当传入两个参数时判断是否存在对应干支
		this.x =
			~~(arg1 + 1) === 0
				? celestialStems.indexOf(arg1) === -1
					? undefined
					: celestialStems.indexOf(arg1)
				: ~~arg1 >= 0 < 10
				? ~~arg1
				: undefined;
		this.y =
			~~(arg2 + 1) === 0
				? terrestrialBranches.indexOf(arg2) === -1
					? undefined
					: terrestrialBranches.indexOf(arg2)
				: ~~arg2 >= 0 < 12
				? ~~arg2
				: undefined;
		this.index = this.__getIndex();
	}
}

module.exports = SexagenaryCycle;
