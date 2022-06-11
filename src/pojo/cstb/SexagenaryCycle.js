/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2022-06-11 15:07:45
 */
const {
	celestialStems,
	terrestrialBranches,
	ceremony,
} = require("@/pojo/Tao.js");

/**
 * 天干地支对象
 */
class SexagenaryCycle {
	constructor(...num) {
		/**
		 * 天干序号 0~9
		 * @type {number}
		 */
		this.x;
		/**
		 * 地支序号 0~11
		 * @type {number}
		 */
		this.y;
		/**
		 * 干支序号 0~59
		 * @type {number}
		 */
		this.index;
		if (num.length === 1) {
			if (num[0] instanceof SexagenaryCycle) return num[0];
			this.__generateByOne(num[0]);
		}
		if (num.length >= 2) this.__generateByTwo(num[0], num[1]);
	}

	/**
	 * 天干序列 Celestial Stems->0-9
	 * @param {boolean} is
	 * @returns 名称/序号
	 */
	cs(is) {
		return is ? celestialStems[this.x] : this.x;
	}

	/**
	 * 地支序列 Terrestrial Branches->0-11
	 * @param {boolean} is
	 * @returns 名称/序号
	 */
	tb(is) {
		return is ? terrestrialBranches[this.y] : this.y;
	}

	/**
	 * 天干地支序列 0-59
	 * @param {boolean} is
	 * @returns 名称/序号
	 */
	cstb(is) {
		return is ? this.cs(is) + this.tb(is) : this.index;
	}

	/**
	 * 获得旬首
	 * @returns {SexagenaryCycle} sexagenaryCycle
	 */
	getLead() {
		const index = ~~(this.index / 10) * 10;
		return new SexagenaryCycle(index);
	}

	/**
	 * 获取隐旗
	 * @param {boolean} is
	 * @returns 名称/序号
	 */
	getConceal(is) {
		const row = ~~(this.getLead().index / 10);
		return is ? ceremony[row] : row;
	}

	/**
	 * 获取天干对应的旗
	 * @param {boolean} is
	 * @returns 名称/序号
	 */
	getCsOrigin(is) {
		// 时干
		let cs = this.cs(is);
		// 如果本身是旬首则选所隐旗
		if (cs === "甲" || cs === 0) cs = this.getConceal(is);
		return cs;
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
	/**
	 * 获取对应的干支序号
	 * @param {*} x 天干
	 * @param {*} y 地支
	 * @returns {Number} 干支序号
	 */
	__getIndex(x = this.x, y = this.y) {
		if (x === -1 || y === -1)
			throw new Error(`can\`t use this arg by x:${x} y:${y}`);
		// 干支相差之数（负按12转正）/2 = 6-干支十位数值
		const difference = y - x;
		const index = ((difference + 24) % 12) / 2;
		const tensPlace = index % 6;
		return tensPlace * 10 + x;
	}

	/**
	 * 根据一个序列获取干支
	 * @param {*} arg 参数
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
	}

	__generateByOne(_arg) {
		let arg = _arg;
		if (typeof arg === "string") {
			if (~~(arg + 1)) {
				// 转数字处理
				arg = ~~arg;
			} else if (arg.length === 2) {
				// 转数组处理
				arg = Array.from(arg);
			} else {
				throw new Error(`array length must be equals two`);
			}
		}
		if (typeof arg === "number") {
			this.__getByIndex(arg);
			return;
		}
		if (arg instanceof Array) {
			this.__generateByTwo(arg[0], arg[1]);
			return;
		}
		if (typeof arg === "object") {
			// 将key,value的对象转为基本对象
			const { x, y } = Object.fromEntries(Object.entries(arg));
			this.__generateByTwo(x, y);
			return;
		}
		throw new Error("this arg can't to use");
	}

	__generateByTwo(x, y) {
		this.x = ~~(x + 1) === 0 ? celestialStems.indexOf(x) : ~~x % 10;
		this.y = ~~(y + 1) === 0 ? terrestrialBranches.indexOf(y) : ~~y % 12;
		this.index = this.__getIndex();
	}
}

module.exports = SexagenaryCycle;
