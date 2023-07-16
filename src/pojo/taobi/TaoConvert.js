/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 22:00:15
 * @LastEditors: lax
 * @LastEditTime: 2023-07-16 10:45:03
 * @FilePath: \taobi\src\pojo\taobi\TaoConvert.js
 */

const Palace = require("@/pojo/taobi/Palace.js");
/* eslint-disable-next-line */
const { SexagenaryCycle } = require("tao_calendar");
require("@/pojo/cstb/SexagenaryCycle.js");
const {
	acquired,
	num,
	celestialStems,
	terrestrialBranches,
} = require("@/pojo/Tao");
/**
 * @description 道化，推阴阳，衍九宫，定八卦
 *
 */
class TaoConvert {
	constructor(follow = 0) {
		/**
		 * 干支历时
		 * @type {Calendar}
		 */
		this.calendar;
		/**
		 * 年天干
		 * @type {SexagenaryCycle}
		 */
		this.year;
		/**
		 * 月天干
		 * @type {SexagenaryCycle}
		 */
		this.month;
		/**
		 * 日天干
		 * @type {SexagenaryCycle}
		 */
		this.date;
		/**
		 * 时天干
		 * @type {SexagenaryCycle}
		 */
		this.hour;
		/**
		 * 一宫
		 * @type {Palace}
		 */
		this.one;
		/**
		 * 二宫
		 * @type {Palace}
		 */
		this.two;
		/**
		 * 三宫
		 * @type {Palace}
		 */
		this.three;
		/**
		 * 四宫
		 * @type {Palace}
		 */
		this.four;
		/**
		 * 五宫
		 * @type {Palace}
		 */
		this.five;
		/**
		 * 六宫
		 * @type {Palace}
		 */
		this.six;
		/**
		 * 七宫
		 * @type {Palace}
		 */
		this.seven;
		/**
		 * 八宫
		 * @type {Palace}
		 */
		this.eight;
		/**
		 * 九宫
		 * @type {Palace}
		 */
		this.nine;
		/**
		 * 先天八卦
		 */
		this.priori;
		/**
		 * 后天八卦
		 * @type {Array<Palace>}
		 */
		this.acquired;
		/**
		 * 九宫格
		 * @type {Array<Palace>}
		 */
		this.box;
		/**
		 * 环宫
		 * @type {Array<Palace>}
		 */
		this.circle;
		/**
		 * -9~9对应阴遁九局、阳遁九局
		 * @type {Number}
		 */
		this.round;
		/**
		 *中宫随法
		 * @type {Number}
		 */
		this.follow = follow;
		/**
		 * 地盘
		 * @type {Map<String,Palace>}
		 */
		this.earths;
		/**
		 * 天盘
		 * @type {Map<String,Palace>}
		 */
		this.heavens;
		/**
		 * 星盘
		 * @type {Map<String,Palace>}
		 */
		this.stars;
		/**
		 * 人盘
		 * @type {Map<String,Palace>}
		 */
		this.peoples;
		/**
		 * 神盘
		 * @type {Map<String,Palace>}
		 */
		this.divinity;
		/**
		 * 十天干
		 * @type {Map<String,Palace>}
		 */
		this.cs;
		/**
		 * 十二地支
		 * @type {Map<String,Palace>}
		 */
		this.tb;

		this.#generatePalace();
		this.#generateAcquiredPalace();
		this.#generateNinePalace();
		this.#generateCirclePalace();
		this.#generateCSPalace();
		this.#generateTBPalace();

		this._ = new Map();
		this.#generate_();
	}

	/**
	 * 生成九宫
	 */
	#generatePalace() {
		this.one = new Palace(0);
		this.two = new Palace(1);
		this.three = new Palace(2);
		this.four = new Palace(3);
		this.five = new Palace(4);
		this.six = new Palace(5);
		this.seven = new Palace(6);
		this.eight = new Palace(7);
		this.nine = new Palace(8);
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

	#generate_() {
		this.acquired.map((palace, index) => {
			this._.set(acquired[index], palace);
			this._.set(num[index], palace);
		});
		this.cs.map((palace, index) => {
			const title = celestialStems[index];
			this._.set(title, palace);
			palace.setOCS(index, true);
		});
		this.tb.map((palace, index) => {
			const title = terrestrialBranches[index];
			this._.set(title, palace);
			palace.setOTB(index, true);
		});
	}

	select(deities) {
		return this._.get(deities);
	}
}

module.exports = TaoConvert;
