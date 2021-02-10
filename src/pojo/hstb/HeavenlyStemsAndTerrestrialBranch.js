/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2021-02-10 22:41:53
 */
const { heavenlyStems, terrestrialBranch } = require("../Tao");

class HeavenlyStemsAndTerrestrialBranch {
	constructor(x = 0, y = 0) {
		// 代表传入的是干支对应数字

		if (arguments.length === 1) {
			this.getByOneArg(x);
		} else {
			// TODO 当传入两个参数时判断是否存在对应干支
			this.x = ~~(x + 1) === 0 ? heavenlyStems.indexOf(x) : x;
			this.y = ~~(y + 1) === 0 ? terrestrialBranch.indexOf(y) : y;
			this.index = this.getIndex();
		}
	}

	// 天干序列 Heavenly Stems->0-9
	hs(is) {
		return is ? heavenlyStems[this.x] : this.x;
	}

	// 地支序列 Terrestrial Branch->0-11
	tb(is) {
		return is ? terrestrialBranch[this.y] : this.y;
	}

	// 天干地支序列 0-59
	hstb(is) {
		return is ? this.hs(is) + this.tb(is) : this.index;
	}

	// 获得旬首
	getLead() {
		const index = ~~(this.index / 10) * 10 + 1;
		return new HeavenlyStemsAndTerrestrialBranch(index);
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
	getIndex() {
		// 干支相差之数（负按12转正）/2 = 6-干支十位数值
		const difference = this.y - this.x;
		const index = (difference < 0 ? difference + 12 : difference) / 2;
		const tensPlace = index === 0 ? 0 : 6 - index;
		return tensPlace * 10 + this.x;
	}

	/**
	 * @method
	 * @description 根据一个参数获取干支
	 * @param {*} arg
	 */
	getByOneArg(arg) {
		// 参数为数 取值范围0-59
		const result = ~~(arg + 1);
		if (result !== 0) {
			const _arg = result - 1;
			// result-> 0-9 -> heavenlyStems.index
			this.x = _arg % 10;
			// result-> 0-11 -> terrestrialBranch.index
			this.y = _arg % 12;
			// result-> 0-59
			this.xy = result - 1;
		} else {
			// 参数为字
			this.x = heavenlyStems.indexOf(arg[0]);
			this.y = terrestrialBranch.indexOf(arg[1]);
			this.index = this.getIndex();
		}
	}
}

module.exports = HeavenlyStemsAndTerrestrialBranch;
