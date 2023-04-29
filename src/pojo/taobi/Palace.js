/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2023-04-29 08:31:30
 */
const {
	acquired,
	num,
	door,
	star,
	divinity,
	ceremony,
	surprise,
	celestialStems,
	terrestrialBranches,
} = require("@/pojo/Tao.js");
const inspect = Symbol.for("nodejs.util.inspect.custom");
const surpriseCeremony = ceremony.concat(surprise);
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
		this.hcs = [];
		/**
		 * 地盘天干
		 */
		this.ecs = [];
		/**
		 * 星
		 */
		this.star = null;
		/**
		 * 门
		 */
		this.door = null;
		/**
		 * 神
		 */
		this.divinity = null;
		/**
		 * 原始天干
		 */
		this.cs = [];
		/**
		 * 原始地支
		 */
		this.tb = [];
	}

	// ######### earths celestial stems #########
	setEarthsCelestialStems(index) {
		this.ecs = index;
	}

	setECS(index) {
		this.setEarthsCelestialStems(index);
	}

	getEarthsCelestialStems(is = false) {
		return is ? this.ecs.map((o) => surpriseCeremony[o]) : this.ecs;
	}

	getECS(is) {
		return this.getEarthsCelestialStems(is);
	}

	// ######### heavens celestial stems #########
	setHeavensCelestialStems(index) {
		this.hcs = index;
	}

	setHCS(index) {
		this.setHeavensCelestialStems(index);
	}

	getHeavensCelestialStems(is = false) {
		return is ? this.hcs.map((o) => surpriseCeremony[o]) : this.hcs;
	}

	getHCS(is) {
		return this.getHeavensCelestialStems(is);
	}

	// ######### star #########
	setStar(index) {
		this.star = index;
	}

	getStar(is = false) {
		if (this.star === null) return "";
		return is ? star[this.star] : this.star;
	}

	// ######### door #########
	setDoor(index) {
		this.door = index;
	}

	getDoor(is = false) {
		if (this.door === null) return "";
		return is ? door[this.door] : this.door;
	}

	// ######### divinity #########
	setDivinity(index) {
		this.divinity = index;
	}

	getDivinity(is = false) {
		if (this.divinity === null) return "";
		return is ? divinity[this.divinity] : this.divinity;
	}

	// ######### palace #########
	getPalace(is = false) {
		return is ? acquired[this.index] : this.index;
	}

	setPalace(index) {
		this.index = index;
	}

	// ######### celestial stems #########
	setCelestialStems(index) {
		this.cs = index;
	}

	setCS(index) {
		this.setCelestialStems(index);
	}

	getCelestialStems(is = false) {
		return is ? this.cs.map((o) => celestialStems[o]) : this.cs;
	}

	getCS(is) {
		return this.getCelestialStems(is);
	}

	// ######### terrestrial branches #########
	setTerrestrialBranches(index) {
		this.tb = index;
	}

	setTB(index) {
		this.setTerrestrialBranches(index);
	}

	getTerrestrialBranches(is = false) {
		return is ? this.tb.map((o) => terrestrialBranches[o]) : this.tb;
	}

	getTB(is) {
		return this.getTerrestrialBranches(is);
	}

	toCanvas() {
		return [
			[this.getDivinity(true), "", ""],
			[this.getDoor(true), "", `${this.getHCS(true)}`],
			[
				this.getStar(true),
				`${this.getPalace(true)}${num[this.index]}`,
				`${this.getECS(true)}`,
			],
		];
	}

	[inspect]() {
		return this.toCanvas();
	}
}
module.exports = Palace;
