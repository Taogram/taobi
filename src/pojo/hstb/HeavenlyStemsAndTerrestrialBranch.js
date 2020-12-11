/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2020-12-11 08:53:31
 */
const { heavenlyStems, terrestrialBranch } = require("./../Tao");
class HeavenlyStemsAndTerrestrialBranch {
	constructor(x = 0, y = 0) {
		// 代表传入的是干支对应数字
		if (arguments.length == 1) {
			const xy = this.__getByUseIndex(x);
			this.x = xy.x;
			this.y = xy.y;
		} else {
			this.x = typeof x === "string" ? heavenlyStems.indexOf(x) : x - 1;
			this.y = typeof y === "string" ? terrestrialBranch.indexOf(y) : y - 1;
		}
		this.index = this.__getIndex();
	}
	// 天干序列 Heavenly Stems
	hs(is) {
		return is ? heavenlyStems[this.x] : this.x + 1;
	}
	// 地支序列 Terrestrial Branch
	tb(is) {
		return is ? terrestrialBranch[this.y] : this.y + 1;
	}
	// 天干地支序列
	hstb(is) {
		return is ? this.hs(is) + this.tb(is) : this.index + 1;
	}
	// 获得旬首
	getLead() {
		const index = ~~(this.index / 10) * 10 + 1;
		return new HeavenlyStemsAndTerrestrialBranch(index);
	}
	// 天干地支对应的序列
	/*
		0		1		2		3
		00/0	01/0	02/0	03/0
		10/1	11/1	00/1	01/1
		08/2	09/2	10/2	11/2
		06/3	07/3	08/3	09/3
		04/4	05/4	06/4	07/4
		02/5	03/5	04/5	05/5
	*/
	__getIndex() {
		const __index = this.y - this.x;
		const _index = (__index < 0 ? __index + 12 : __index) / 2;
		const index = _index == 0 ? 0 : 6 - _index;
		return index * 10 + this.x;
	}
	// 根据序列获取对应x、y
	__getByUseIndex(index) {
		const x = (index - 1) % 10;
		const y = (index - 1) % 12;
		return { x, y };
	}
}

module.exports = HeavenlyStemsAndTerrestrialBranch;
