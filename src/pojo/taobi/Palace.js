/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 19:52:17
 */
const {
	acquired,
	num,
	ceremony,
	surprise,
	celestialStems,
	terrestrialBranches,
} = require("@/pojo/Tao.js");
const inspect = Symbol.for("nodejs.util.inspect.custom");
const Door = require("@/pojo/taobi/Door");
const Star = require("@/pojo/taobi/Star");
const Divinity = require("@/pojo/taobi/Divinity");
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
		 * @type {Star}
		 */
		this.star;
		/**
		 * 门
		 * @type {Door}
		 */
		this.door;
		/**
		 * 神
		 * @type {Divinity}
		 */
		this.divinity;
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
	setStar(obj) {
		this.star = new Star(obj);
	}

	getStar(is = false) {
		if (this.star === undefined) return "";
		return is ? this.star.getIndex(true) : this.star;
	}

	// ######### door #########
	setDoor(obj) {
		this.door = new Door(obj);
	}

	getDoor(is = false) {
		if (this.door === undefined) return "";
		return is ? this.door.getIndex(true) : this.door;
	}

	// ######### divinity #########
	setDivinity(obj) {
		this.divinity = new Divinity(obj);
	}

	getDivinity(is = false) {
		if (this.divinity === undefined) return "";
		return is ? this.divinity.getIndex(true) : this.divinity;
	}

	// ######### palace #########
	getPalace(is = false) {
		return is ? acquired[this.index] : this.index;
	}

	setPalace(index) {
		this.index = index;
	}

	// ######### celestial stems #########
	setCelestialStems(index, isUpdate = false) {
		if (isUpdate) this.cs.push(index);
		if (!isUpdate) this.cs = index;
	}

	setCS(index, isUpdate) {
		this.setCelestialStems(index, isUpdate);
	}

	getCelestialStems(is = false) {
		return is ? this.cs.map((o) => celestialStems[o]) : this.cs;
	}

	getCS(is) {
		return this.getCelestialStems(is);
	}

	// ######### terrestrial branches #########
	setTerrestrialBranches(index, isUpdate = false) {
		if (isUpdate) this.tb.push(index);
		if (!isUpdate) this.tb = index;
	}

	setTB(index, isUpdate) {
		this.setTerrestrialBranches(index, isUpdate);
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
