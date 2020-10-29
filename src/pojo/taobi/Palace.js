/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 15:23:35
 */
class Palace {
	constructor(index, hs, name) {
		// 宫位
		this.index = index.index;
		// 卦
		this.trigrams = null;
		// 天干（三奇六仪）
		this.hs = hs;
		// 值
		this.name = name;
		// 周序位 顺时序位
		this.rIndex = index.rIndex;

		// 值符
		this.jobSymbol = false;
	}
	setHS(hs) {
		this.hs = hs;
	}
	setName(name) {
		this.name = name;
	}
	setTrigrams(trigrams) {
		this.trigrams = trigrams;
	}
	setSymbol(is) {
		this.jobSymbol = is;
	}
}
module.exports = Palace;
