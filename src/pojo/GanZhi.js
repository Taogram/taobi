/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2020-10-22 23:18:46
 */
class GanZhi {
	constructor(x = 0, y = 0) {
		if (arguments.length == 1) {
			this.x = this._getByIndex().x;
			this.y = this._getByIndex().y;
		} else {
			this.x = x;
			this.y = y;
		}
		this.index = this._getIndex();
	}
	getXIndex() {
		return this.x;
	}
	getYIndex() {
		return this.y;
	}
	getXContent() {
		return this._x[this.x];
	}
	getYContent() {
		return this._y[this.y];
	}
	_getIndex() {
		const single = this.x + 1;
		const ten = (this.x < this.y ? this.x - this.y + 12 : this.x - this.y) / 2;
		return ten * 10 + single;
	}
	_getByIndex() {
		const str = this.x + "";
		const x = ~~str.slice(str.length - 1) - 1;
		const y = ~~str.slice(0, str.length - 1);
		return { x, y };
	}
}
GanZhi._x = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
GanZhi._y = [
	"子",
	"丑",
	"寅",
	"卯",
	"辰",
	"巳",
	"午",
	"未",
	"申",
	"酉",
	"戌",
	"亥"
];
module.exports = GanZhi;
