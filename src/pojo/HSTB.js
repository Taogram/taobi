/*
 * @Description: 天干地支对象
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 20:15:13
 * @LastEditors: lax
 * @LastEditTime: 2020-10-26 09:56:03
 */
// const _ = require("./../tools/index");
class HSTB {
	constructor(x = 0, y = 0, type = 0) {
		// 代表传入的是干支对应数字
		if (arguments.length == 1) {
			const xy = this._getByIndex(x);
			this.x = xy.x;
			this.y = xy.y;
		} else {
			this.x = x;
			this.y = y;
		}
		this.index = this._getIndex();
		this.type = type;
	}
	// 天干序列 Heavenly Stems
	hs() {
		return this.x + 1;
	}
	// 地支序列 Terrestrial Branch
	tb() {
		return (this.x < this.y ? this.x - this.y + 12 : this.x - this.y) / 2;
	}
	getHS() {
		return this._hs[this.x];
	}
	getTB() {
		return this._tb[this.y];
	}
	// 天干地支对应的序列
	_getIndex() {
		const hs = this.hs();
		const tb = this.tb();
		return tb * 10 + hs;
	}
	_getByIndex(xy) {
		const str = xy + "";
		const _x = ~~str.slice(str.length - 1);
		const _y = ~~str.slice(0, str.length - 1);
		const x = _x - 1;
		const y = x - _y * 2 < 0 ? x - _y * 2 + 12 : x - _y * 2;
		return { x, y };
	}
	_hs = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
	_tb = [
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
}

module.exports = HSTB;
