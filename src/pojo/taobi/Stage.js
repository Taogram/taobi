/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2020-10-27 17:42:01
 */
const P = require("./Palace");
const six = ["戊", "己", "庚", "辛", "壬", "癸"];
const three = ["乙", "丙", "丁"];
class Stage {
	constructor(calendar, round) {
		this.calendar = calendar;
		this.round = round;
		this._l = [
			new P(),
			new P(),
			new P(),
			new P(),
			new P(),
			new P(),
			new P(),
			new P(),
			new P()
		];
		this.list = [
			[this._l[3], this._l[8], this._l[1]],
			[this._l[2], this._l[4], this._l[6]],
			[this._l[7], this._l[0], this._l[5]]
		];
		this.__init();
	}
	__init() {
		this.__byRound();
	}
	__byRound() {
		this.six.map((x, i) => {
			this._l[i + this.round - 1] = x;
		});
	}
}

module.exports = Stage;
