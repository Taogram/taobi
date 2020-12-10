/*
 * @Description: 地盘
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-29 09:53:31
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 10:19:19
 */
const Inning = require("./Inning");
const _ = require("../../tools/index");
const { ceremony, surprise } = require("../Tao");
class Earth extends Inning {
	constructor(round) {
		super(round);
		this.__setSurpriseAndCeremonyByRound();
	}
	/**
	 * @private
	 * @description 安用局排三奇六仪
	 */
	__setSurpriseAndCeremonyByRound() {
		// 用局
		const round = this.round;
		// 为奇门之三奇六仪固定顺序
		const order = ceremony.concat(surprise);
		// 阴逆序
		const negative = [8, 7, 6, 5, 4, 3, 2, 1, 0];
		/**
		 * 打头序数 = 9-用局数（安9一周期）
		 */
		const num = _.arrayUp(negative, 9 - (Math.abs(round) % 9));
		order.map((x, i) => {
			this._acquired[round < 0 ? num[i] : (round - 1 + i) % 9].setHS(x);
		});
	}
}
module.exports = Earth;
