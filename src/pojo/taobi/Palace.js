/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2022-04-10 14:19:04
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

	setDoor(door) {
		this.door = door;
	}

	getDoor() {
		return this.door;
	}

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
