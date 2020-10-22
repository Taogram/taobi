/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:38:09
 * @LastEditors: lax
 * @LastEditTime: 2020-10-22 17:21:32
 */
const tg = require("./TianGan.js");
const dz = require("./DiZhi.js");
class Eight {
	constructor() {
		this.date = this.time();
		this.year = this.getYear();
		this.mouth = this.getMonth();
		console.log(this.year);
	}
	getYear() {
		const yearString = this.date.getFullYear() + "";
		const single = ~~yearString.slice(yearString.length - 1) + 6 + "";
		const tg_index = ~~single.slice(single.length - 1);
		const remainder = (~~yearString % 12) + 6 + "";
		const dz_index = ~~remainder.slice(remainder.length - 1);
		return { x: new tg({ index: tg_index }), y: new dz({ index: dz_index }) };
	}
	getMonth() {
		const year_gan = this.year.index * 2 + "";
		let single = ~~year_gan.slice(year_gan.length - 1) + 6;
		const index = ~~single.slice(single.length - 1);
		const dz_index = this.date.getMonth() + 1;
		return { x: new tg({ index }), y: new dz({ index: dz_index }) };
	}
	day() {}
	hour() {}
	time() {
		return new Date();
	}
}
module.exports = Eight;
new Eight();
