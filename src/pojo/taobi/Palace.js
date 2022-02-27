/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2022-02-27 23:56:15
 */
class Palace {
	constructor(index) {
		// 后天八卦宫位序号
		this.index = index;
		// 周序位 顺时序位
		this.rIndex = null;
		// 天盘天干
		this.hs = [];
		// 地盘天干
		this._hs = [];
		// 值
		// this.name = value.name || this.hs;
		// 卦
		// this.trigrams = value.trigrams || this.name;
		this.jobSymbol = false;
	}

	setHS(hs) {
		this.hs = hs;
	}

	setName(name) {
		this.name = name;
	}

	getHS() {
		return this.hs;
	}

	getName() {
		return this.name || this.getHS();
	}

	setTrigrams(trigrams) {
		this.trigrams = trigrams;
	}

	setSymbol(is) {
		this.jobSymbol = is;
	}

	toString() {}
}
module.exports = Palace;
