/*
 * @Description: 天盘对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-29 09:53:31
 * @LastEditors: lax
 * @LastEditTime: 2020-12-11 08:55:35
 */
// const Palace = require("./Palace");
const Inning = require("./Inning");
const _ = require("../../tools/index");
const { star } = require("../Tao");
class Heaven extends Inning {
	constructor(earth, hour) {
		super(earth.round);
		this.hour = hour;
		this.earth = earth;
		this.__setStarByHourAndRound();
	}
	/**
	 * @private
	 * @description 安时及用局获取星序
	 */
	__setStarByHourAndRound() {
		// 中宫同地盘
		this._acquired[4].setName(star[4]);
		this._acquired[4].setHS(this.earth._acquired[4].hs);
		// 时
		const hour = this.hour;
		// 时之旬首对应宫
		const palace = this.earth.getPalaceByHour(hour.getLead());
		// 时天干之对应宫
		const _palace = this.earth.getPalaceByHour(hour);
		// 设置值符
		_palace.setSymbol(true);
		// 星数位移序数
		let moveOrder = _palace.rIndex - palace.rIndex;
		moveOrder = moveOrder < 0 ? -moveOrder : 8 - moveOrder;
		// 符首入中宫
		if (!palace.rIndex) moveOrder = 7;
		// 时干入中宫
		if (!_palace.rIndex) moveOrder = 4;
		// 地盘周序
		const earthOrder = this.earth._circle.map(p => {
			return p.hs;
		});
		// 天盘周序
		const heavenOrder = _.arrayUp(earthOrder, moveOrder);
		// 布天盘之三七六仪
		this._circle.map((p, i) => {
			// 星数移动序数：顺时方向
			p.setHS(heavenOrder[i]);
		});
		// 布天盘之星数
		this._acquired.map(p => {
			// 星序
			const index = this.earth._acquired.findIndex(_p => {
				return p.hs == _p.hs;
			});
			p.setName(star[index]);
		});
	}
}
module.exports = Heaven;
