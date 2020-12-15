/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2020-12-15 22:25:23
 */
class Palace {
	constructor(index, value, isTop, father, children) {
		// 是否顶层
		this.isTop = isTop == undefined ? false : isTop;

		if (this.isTop) {
			this.children = children;
		}
		// 宫位
		this.index = index.index;
		// 周序位 顺时序位
		this.rIndex = index.rIndex;
		// value
		value = value || {};
		// 天干
		this.hs = value.hs || null;
		// 值
		this.name = value.name || this.hs;
		// 卦
		this.trigrams = value.trigrams || this.name;
		this.father = father;
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
}
module.exports = Palace;
