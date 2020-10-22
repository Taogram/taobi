/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-22 23:18:03
 */
const gz = require("./GanZhi");
class Eight {
	constructor(p = {}) {
		this.date = p.date || this.time();
		this.year = this.getYear();
		this.mouth = this.getMonth();
		console.log(this.mouth);
	}
	getYear() {
		// 年份+6的个位数即对应天干
		const year_value = this.date.getFullYear();
		const single = year_value + 6 + "";
		const tg_index = ~~single.slice(single.length - 1);
		// 年份的12余数+6对应地支
		const remainder = (year_value % 12) + 6 + "";
		const dz_index = ~~remainder.slice(remainder.length - 1);
		return new gz(tg_index, dz_index);
	}
	getMonth() {
		const mouth_index = this.date.getMonth();
		// 月份对应地支 12月对应0
		const dz_index = mouth_index == 12 ? 0 : mouth_index + 1;
		// 年干*2+月地支的个位数为月天干
		const year_gan = this.year.getXIndex() * 2 + dz_index + "";
		const tg_index = ~~year_gan.slice(year_gan.length - 1);
		return new gz(tg_index, dz_index);
	}
	day() {
		// const index = this.year.index + this.mouth.index + this.date.getDays();
		// console.log(index);
	}
	hour() {}
	time() {
		return new Date();
	}
}
module.exports = Eight;
new Eight();
