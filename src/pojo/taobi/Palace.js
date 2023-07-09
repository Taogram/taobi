/*
 * @Description: 宫格对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 16:35:18
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 22:29:33
 */
const INDEX = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
const ACQUIRED = ["坎", "坤", "震", "巽", "中", "乾", "兑", "艮", "离"];
const ACQUIRED_PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
const { Phases } = require("tao_taichi.js");
const { CelestialStems, TerrestrialBranches } = require("tao_calendar");
const inspect = Symbol.for("nodejs.util.inspect.custom");
const Door = require("@/pojo/taobi/Door");
const Star = require("@/pojo/taobi/Star");
const Divinity = require("@/pojo/taobi/Divinity");
class Palace extends Phases {
	constructor(index) {
		if (index instanceof Palace) return index;
		const i = ~~(index + 1) === 0 ? ACQUIRED.indexOf(index) : ~~index % 9;
		if (i < 0) throw new Error(`arg can\`t be use => ${index}`);
		super(ACQUIRED_PHASES[i], null);
		/**
		 * 后天八卦宫位序号
		 */
		this.index = i;
		/**
		 * 周序位 顺时序位
		 */
		this.rIndex = null;
		/**
		 * 天盘天干
		 * @type {[CelestialStems]}
		 */
		this.hcs = [];
		/**
		 * 地盘天干
		 * @type {[CelestialStems]}
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
		 * @type {[CelestialStems]}
		 */
		this.cs = [];
		/**
		 * 原始地支
		 * @type {[TerrestrialBranches]}
		 */
		this.tb = [];
	}

	// ######### earths celestial stems #########
	/**
	 * @description 设置地盘天干
	 * @param {CelestialStems} obj
	 * @param {boolean} isUpdate
	 */
	setEarthsCelestialStems(obj, isUpdate = false) {
		if (isUpdate) this.ecs.push(new CelestialStems(obj));
		if (!isUpdate) this.ecs = obj.map((o) => new CelestialStems(o));
	}

	setECS(obj, isUpdate) {
		this.setEarthsCelestialStems(obj, isUpdate);
	}

	/**
	 * @description 获取地盘天干
	 * @param {boolean} is
	 * @returns {CelestialStems} cs
	 */
	getEarthsCelestialStems(is = false) {
		return is ? this.ecs.map((o) => o.getValue(true)) : this.ecs;
	}

	getECS(is) {
		return this.getEarthsCelestialStems(is);
	}

	// ######### heavens celestial stems #########
	/**
	 * @description 设置天盘天干
	 * @param {CelestialStems} obj
	 * @param {boolean} isUpdate
	 */
	setHeavensCelestialStems(obj, isUpdate = false) {
		if (isUpdate) this.hcs.push(new CelestialStems(obj));
		if (!isUpdate) this.hcs = obj.map((o) => new CelestialStems(o));
	}

	setHCS(obj, isUpdate) {
		this.setHeavensCelestialStems(obj, isUpdate);
	}

	/**
	 * @description 获取天盘天干
	 * @param {boolean} is
	 * @returns {CelestialStems} cs
	 */
	getHeavensCelestialStems(is = false) {
		return is ? this.hcs.map((o) => o.getValue(true)) : this.hcs;
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
		return is ? ACQUIRED[this.index] : this.index;
	}

	setPalace(index) {
		this.index = index;
	}

	// ######### celestial stems #########
	/**
	 * @description 设置原始天干
	 * @param {CelestialStems} obj
	 * @param {boolean} isUpdate
	 */
	setCelestialStems(obj, isUpdate = false) {
		if (isUpdate) this.cs.push(new CelestialStems(obj));
		if (!isUpdate) this.cs = obj.map((o) => new CelestialStems(o));
	}

	setCS(obj, isUpdate) {
		this.setCelestialStems(obj, isUpdate);
	}

	/**
	 * @description 获取原始天干
	 * @param {boolean} is
	 * @returns {CelestialStems} cs
	 */
	getCelestialStems(is = false) {
		return is ? this.cs.map((o) => o.getValue(true)) : this.cs;
	}

	getCS(is) {
		return this.getCelestialStems(is);
	}

	// ######### terrestrial branches #########
	/**
	 * @description 设置原始地支
	 * @param {TerrestrialBranches} obj
	 * @param {boolean} isUpdate
	 */
	setTerrestrialBranches(obj, isUpdate = false) {
		if (isUpdate) this.tb.push(new TerrestrialBranches(obj));
		if (!isUpdate) this.tb = obj.map((o) => new TerrestrialBranches(o));
	}

	setTB(index, isUpdate) {
		this.setTerrestrialBranches(index, isUpdate);
	}

	/**
	 * @description 获取原始地支
	 * @param {boolean} is
	 * @returns {TerrestrialBranches} tb
	 */
	getTerrestrialBranches(is = false) {
		return is ? this.tb.map((o) => o.getValue(true)) : this.tb;
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
				`${this.getPalace(true)}${INDEX[this.index]}`,
				`${this.getECS(true)}`,
			],
		];
	}

	[inspect]() {
		return this.toCanvas();
	}
}
module.exports = Palace;
