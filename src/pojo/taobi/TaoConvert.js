/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-08-16 23:27:53
 * @LastEditors: lax
 * @LastEditTime: 2024-09-14 23:53:16
 */

const Palace = require("@/pojo/taobi/Palace.js");
/* eslint-disable-next-line */
const { SexagenaryCycle,CelestialStems,TerrestrialBranches } = require("tao_calendar");
const { CELESTIAL_STEMS_ARR } = CelestialStems;
const { TERRESTRIAL_BRANCHES_ARR } = TerrestrialBranches;
require("@/pojo/cstb/SexagenaryCycle.js");
/**
 * @description 道化，推阴阳，衍九宫，定八卦
 *
 */
class TaoConvert {
	/**
	 * 配置
	 * @type {Object}
	 */
	OPTIONS;

	/**
	 * 宫对象
	 * @type {Palace}
	 */
	#Palace;

	/**
	 * 干支历时
	 * @type {Calendar}
	 */
	calendar;

	/**
	 * 年天干
	 * @type {SexagenaryCycle}
	 */
	year;

	/**
	 * 月天干
	 * @type {SexagenaryCycle}
	 */
	month;

	/**
	 * 日天干
	 * @type {SexagenaryCycle}
	 */
	date;

	/**
	 * 时天干
	 * @type {SexagenaryCycle}
	 */
	hour;

	/**
	 * 时间
	 * @type {Date}
	 */
	time;

	/**
	 * 二十四节气
	 * @type {Array[Date]}
	 */
	during;

	/**
	 * 一宫
	 * @type {Palace}
	 */
	one;

	/**
	 * 二宫
	 * @type {Palace}
	 */
	two;

	/**
	 * 三宫
	 * @type {Palace}
	 */
	three;

	/**
	 * 四宫
	 * @type {Palace}
	 */
	four;

	/**
	 * 五宫
	 * @type {Palace}
	 */
	five;

	/**
	 * 六宫
	 * @type {Palace}
	 */
	six;

	/**
	 * 七宫
	 * @type {Palace}
	 */
	seven;

	/**
	 * 八宫
	 * @type {Palace}
	 */
	eight;

	/**
	 * 九宫
	 * @type {Palace}
	 */
	nine;

	/**
	 * 先天八卦
	 * 乾一、兑二、离三、震四、巽五、坎六、艮七、坤八
	 * @type {Array<Palace>}
	 */
	priori;

	/**
	 * 后天八卦
	 * 坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九
	 * @type {Array<Palace>}
	 */
	acquired;

	/**
	 * 九宫格
	 * [
	 * 	[4,9,2]
	 * 	[3,5,7]
	 * 	[8,1,6]
	 * ]
	 * @type {Array<Palace>}
	 */
	box;

	/**
	 * 环宫
	 * [4,9,2,7,6,1,8,3]
	 * @type {Array<Palace>}
	 */
	circle;

	/**
	 * -9~9对应阴遁九局、阳遁九局
	 * @type {Number}
	 */
	round;

	/**
	 * 三元定法列表 顺序：均分、拆补、茅山、置润
	 * @type {Array<Number>}
	 */
	ELEMENTS;

	/**
	 * 中宫随法
	 * * 中宫寄二宫
	 * * 中宫二八宫
	 * * 中宫寄四维宫
	 * * 中宫寄八节
	 * @type {Number}
	 */
	follow;

	/**
	 * 地盘
	 * @type {Map<String,Palace>}
	 */
	earths;

	/**
	 * 天盘
	 * @type {Map<String,Palace>}
	 */
	heavens;

	/**
	 * 星盘
	 * @type {Map<String,Palace>}
	 */
	stars;

	/**
	 * 人盘
	 * @type {Map<String,Palace>}
	 */
	peoples;

	/**
	 * 神盘
	 * @type {Map<String,Palace>}
	 */
	divinity;

	/**
	 * 十天干
	 * @type {Map<String,Palace>}
	 */
	cs;

	/**
	 * 十二地支
	 * @type {Map<String,Palace>}
	 */
	tb;

	/**
	 * 用神集
	 * @type {Map<name,Palace>}
	 */
	_;

	constructor(options = {}) {
		this.OPTIONS = this.generateOptions(options);
		this.#Palace =
			this.OPTIONS.Palace.prototype instanceof Palace
				? this.OPTIONS.Palace
				: Palace;
		this._ = new Map();

		this.#generatePalace();
		this.#generatePrioriPalace();
		this.#generateAcquiredPalace();
		this.#generateNinePalace();
		this.#generateCirclePalace();
		this.#generateCSPalace();
		this.#generateTBPalace();
		this.#generateFlag();
	}

	generateOptions(options) {
		/**
		 * @Palace 宫对象
		 * @element 直接指定上中下元[0-2]
		 * @elements 均分法/拆补法/茅山法/置闰法
		 */
		const DEFAULT_OPTIONS = { Palace, element: null, elements: null };
		return Object.assign({}, DEFAULT_OPTIONS, options);
	}

	/**
	 * 生成九宫
	 */
	#generatePalace() {
		this.one = new this.#Palace(0);
		this.two = new this.#Palace(1);
		this.three = new this.#Palace(2);
		this.four = new this.#Palace(3);
		this.five = new this.#Palace(4);
		this.six = new this.#Palace(5);
		this.seven = new this.#Palace(6);
		this.eight = new this.#Palace(7);
		this.nine = new this.#Palace(8);
	}

	/**
	 * 后天八卦
	 */
	#generateAcquiredPalace() {
		this.acquired = [
			this.one,
			this.two,
			this.three,
			this.four,
			this.five,
			this.six,
			this.seven,
			this.eight,
			this.nine,
		];
	}

	/**
	 * 先天八卦
	 */
	#generatePrioriPalace() {
		this.priori = [
			this.six,
			this.seven,
			this.nine,
			this.three,
			this.four,
			this.one,
			this.eight,
			this.two,
		];
	}

	/**
	 * 生成九宫格
	 */
	#generateNinePalace() {
		this.box = [
			[this.four, this.nine, this.two],
			[this.three, this.five, this.seven],
			[this.eight, this.one, this.six],
		];
	}

	/**
	 * 生成环宫
	 */
	#generateCirclePalace() {
		this.circle = [
			this.four,
			this.nine,
			this.two,
			this.seven,
			this.six,
			this.one,
			this.eight,
			this.three,
		];
		this.circle.map((palace, index) => {
			palace.rIndex = index;
		});
	}

	#generateCSPalace() {
		this.cs = [
			this.three,
			this.three,
			this.nine,
			this.nine,
			this.five,
			this.five,
			this.seven,
			this.seven,
			this.one,
			this.one,
		];
	}

	#generateTBPalace() {
		this.tb = [
			this.one,
			this.eight,
			this.eight,
			this.three,
			this.four,
			this.four,
			this.nine,
			this.two,
			this.two,
			this.seven,
			this.six,
			this.six,
		];
	}

	#generateFlag() {
		this.acquired.map((palace, index) => {
			this._.set(this.#Palace.ACQUIRED[index], palace);
			this._.set(this.#Palace.INDEX[index], palace);
		});
		this.cs.map((palace, index) => {
			const title = CELESTIAL_STEMS_ARR[index];
			this._.set(title, palace);
			palace.setOCS(index, true);
		});
		this.tb.map((palace, index) => {
			const title = TERRESTRIAL_BRANCHES_ARR[index];
			this._.set(title, palace);
			palace.setOTB(index, true);
		});
	}

	select(deities) {
		return this._.get(deities);
	}

	getCanvas() {
		return this.box.map((row) => {
			return row.map((palace) => {
				return palace.toCanvas();
			});
		});
	}

	getArray() {
		return this.box
			.map((row) => {
				return row.reduce(
					(acc, next) => {
						const canvas = next.toCanvas();
						return acc.map((each, i) => {
							return each.concat(canvas[i]);
						});
					},
					[[], [], []]
				);
			})
			.reduce((acc, next) => {
				return acc.concat(next);
			}, []);
	}
}

module.exports = TaoConvert;
