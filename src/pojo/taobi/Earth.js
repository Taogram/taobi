/*
 * @Description: 地盘
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-29 09:53:31
 * @LastEditors: lax
 * @LastEditTime: 2021-12-18 14:35:15
 */
const Inning = require("./Inning");
const _ = require("../../tools/index");
// 六仪 三奇
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
		// 为奇门之地盘三奇六仪固定顺序
		const base_order = ceremony.concat(surprise);
		// 阳顺阴逆
		const round_order = round > 0 ? base_order : base_order.reverse();
		/**
		 * 安用局为打头序数 => 九-用局数（安九一周期）
		 */
		const order =
			round > 0
				? _.arrayUp(round_order, (10 - round) % 9)
				: _.arrayUp(round_order, 9 + round);
		order.map((x, i) => {
			this._acquired[i].setHS(x);
		});
	}
}
module.exports = Earth;
