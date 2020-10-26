/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-26 10:08:38
 * @LastEditors: lax
 * @LastEditTime: 2020-10-26 10:10:48
 */
class Inning {
	constructor(p = {}) {
		this.date = p.date || this.time();
	}
	time() {
		return new Date();
	}
	solarTerms = [];
}

module.exports = Inning;
