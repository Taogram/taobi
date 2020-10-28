/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2020-10-28 17:42:32
 */
class Palace {
	constructor(hs, index, star, door) {
		this.hs = hs;
		this.pIndex = index.pIndex;
		this.rIndex = index.rIndex;
		this.star = star;
		this.door = door;
	}
	setHS(hs) {
		this.hs = hs;
	}
	setStar(star) {
		this.star = star;
	}
}
module.exports = Palace;
