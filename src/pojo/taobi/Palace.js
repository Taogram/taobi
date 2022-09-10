/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2022-09-10 11:55:30
 */
const { acquired, num } = require("@/pojo/Tao.js");
const inspect = Symbol.for("nodejs.util.inspect.custom");

class Palace {
	constructor(index) {
		/**
		 * 后天八卦宫位序号
		 */
		this.index = index;
		/**
		 * 周序位 顺时序位
		 */
		this.rIndex = null;
		/**
		 * 天盘天干
		 */
		this.hs = [];
		/**
		 * 地盘天干
		 */
		this._hs = "";
		/**
		 * 星
		 */
		this.star = "";
		/**
		 * 门
		 */
		this.door = "";
		/**
		 * 神
		 */
		this.divinity = "";
	}

	// ######### earths celestial stems #########
	setEarthsCelestialStems(hs) {
		this._hs = hs;
	}

	setECS(hs) {
		this.setEarthsCelestialStems(hs);
	}

	getEarthsCelestialStems() {
		return this._hs;
	}

	getECS() {
		return this.getEarthsCelestialStems();
	}

	// ######### heavens celestial stems #########
	setHeavensCelestialStems(hs) {
		this.hs = hs;
	}

	setHCS(hs) {
		this.setHeavensCelestialStems(hs);
	}

	getHeavensCelestialStems() {
		return this.hs;
	}

	getHCS() {
		return this.getHeavensCelestialStems();
	}

	// ######### star #########
	setStar(star) {
		this.star = star;
	}

	getStar() {
		return this.star;
	}

	// ######### door #########
	setDoor(door) {
		this.door = door;
	}

	getDoor() {
		return this.door;
	}

	// ######### divinity #########
	setDivinity(divinity) {
		this.divinity = divinity;
	}

	getDivinity() {
		return this.divinity;
	}

	toCanvas() {
		return [
			[this.divinity, "", ""],
			[
				this.door,
				"",
				`${this.hs[0] ? this.hs[0] : ""}${this.hs[1] ? this.hs[1] : ""}`,
			],
			[this.star, `${acquired[this.index]}${num[this.index]}`, this._hs],
		];
	}

	[inspect]() {
		return this.toCanvas();
	}
}
module.exports = Palace;
