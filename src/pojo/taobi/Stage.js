/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2020-10-28 17:56:32
 */
const P = require("./Palace");
const Calendar = require("./../Calendar");
// const _ = require("./../../tools/index");
// 六仪
const ceremony = ["戊", "己", "庚", "辛", "壬", "癸"];
// 三奇
const surprise = ["丁", "丙", "乙"];
// 天盘
// const star_p = [
// 	"天蓬星",
// 	"天芮星",
// 	"天冲星",
// 	"天辅星",
// 	"天禽星",
// 	"天心星",
// 	"天柱星",
// 	"天任星",
// 	"天英星"
// ];
const star_ = ["蓬", "任", "冲", "辅", "英", "芮", "柱", "心", "禽"];
class Stage {
	constructor(calendar, round) {
		this.calendar = calendar;
		// 用局
		this.round = round;
		this._l = [
			new P(null, { pIndex: 1, rIndex: 0 }),
			new P(null, { pIndex: 2, rIndex: 5 }),
			new P(null, { pIndex: 3, rIndex: 2 }),
			new P(null, { pIndex: 4, rIndex: 3 }),
			new P(null, { pIndex: 5, rIndex: null }),
			new P(null, { pIndex: 6, rIndex: 7 }),
			new P(null, { pIndex: 7, rIndex: 6 }),
			new P(null, { pIndex: 8, rIndex: 1 }),
			new P(null, { pIndex: 9, rIndex: 4 })
		];
		this._r = [
			this._l[0],
			this._l[7],
			this._l[2],
			this._l[3],
			this._l[8],
			this._l[1],
			this._l[6],
			this._l[5]
		];
		this.list = [
			[this._l[3], this._l[8], this._l[1]],
			[this._l[2], this._l[4], this._l[6]],
			[this._l[7], this._l[0], this._l[5]]
		];
		this.__init();
	}
	__init() {
		this.__setByRound();
		this.__setStar();
	}
	// 安用局布三奇六仪
	__setByRound() {
		const arr = ceremony.concat(surprise);
		arr.map((x, i) => {
			const index = i + Math.abs(this.round) + (this.round < 0 ? 1 : -1);
			this._l[this.round < 0 ? 8 - (index % 9) : index % 9].setHS(x);
		});
	}
	__setStar() {
		// 时
		const hour = this.calendar.hour;
		// 时辰之旬首隐于之仪
		const team = ceremony[hour.getLead().tb()];
		// 此仪地盘之对应宫
		const palace = this.getPalaceByCeremony(team);
		// 时辰之天干
		const hs = hour.hs(true);
		// 此天干之对应宫
		const _palace = this.getPalaceByCeremony(hs);
		this._r.map((p, i) => {
			p.setStar(star_[8 - Math.abs(_palace.rIndex - palace.rIndex) + i]);
		});
	}
	getPalaceByCeremony(ceremony) {
		return this._l.filter(p => {
			if (p.hs == ceremony) return true;
		})[0];
	}
	getIndexByCeremonyInR() {
		return this._r.filter();
	}
}

module.exports = Stage;
console.log(
	new Stage(
		new Calendar([
			[6, 0],
			[2, 10],
			[0, 4],
			[0, 0]
		]),
		-4
	).list
);
