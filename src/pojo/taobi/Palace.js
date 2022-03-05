/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 15:14:21
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
		this.star = "";
		// 值
		// this.name = value.name || this.hs;
		// 卦
		// this.trigrams = value.trigrams || this.name;
		this.jobSymbol = false;
	}

	// ######### earth celestial stems #########
	setEarthCelestialStems(hs) {
		this._hs = hs;
	}

	setECS(hs) {
		this.setEarthCelestialStems(hs);
	}

	getEarthCelestialStems() {
		return this._hs;
	}

	getECS() {
		return this.getEarthCelestialStems();
	}

	// ######### heaven celestial stems #########
	setHeavenCelestialStems(hs) {
		this.hs = hs;
	}

	setHCS(hs) {
		this.setHeavenCelestialStems(hs);
	}

	getHeavenCelestialStems() {
		return this.hs;
	}

	getHCS() {
		return this.getHeavenCelestialStems();
	}

	setStar(star) {
		this.star = star;
	}

	getStar() {
		return this.star;
	}

	setName(name) {
		this.name = name;
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
