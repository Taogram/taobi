/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2020-10-27 21:06:57
 */
class Palace {
	constructor(hs, index, star, door) {
		this.hs = hs;
		this.index = index;
		this.star = star;
		this.door = door;
	}
	setHS(hs) {
		this.hs = hs;
	}
}
module.exports = Palace;
