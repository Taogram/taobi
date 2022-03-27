/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 22:00:15
 * @LastEditors: lax
 * @LastEditTime: 2022-03-27 20:10:22
 * @FilePath: \taobi\src\pojo\taobi\TaoConvert.js
 */

const Palace = require("@/pojo/taobi/Palace.js");
/* eslint-disable */
const SexagenaryCycle = require("@/pojo/cstb/SexagenaryCycle.js");

/**
 * @description 道化，推阴阳，衍九宫，定八卦
 *
 */
class TaoConvert {
	constructor() {
		/**
		 * 阴阳历时
		 * @type {Calendar}
		 */
		this.calendar = null;
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
		 * 地盘
		 * @type {Map<String,Palace>}
		 */
		this.earth;
		this.generatePalace();
		this.generateAcquiredPalace();
		this.generateNinePalace();
		this.generateCirclePalace();
	}

	/**
	 * 生成九宫
	 */
	generatePalace() {
		this.one = new Palace(1);
		this.two = new Palace(2);
		this.three = new Palace(3);
		this.four = new Palace(4);
		this.five = new Palace(5);
		this.six = new Palace(6);
		this.seven = new Palace(7);
		this.eight = new Palace(8);
		this.nine = new Palace(9);
	}

	/**
	 * 后台八卦
	 */
	generateAcquiredPalace() {
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
	generateNinePalace() {
		this.box = [
			[this.four, this.nine, this.two],
			[this.three, this.five, this.seven],
			[this.eight, this.one, this.six],
		];
	}

	/**
	 * 生成环宫
	 */
	generateCirclePalace() {
		this.circle = [
			this.four,
			this.nine,
			this.two,
			this.seven,
			this.six,
			this.one,
			this.eight,
			this.three,
			this.five,
		];
		this.circle.map((palace, index) => {
			palace.rIndex = index;
		});
	}
}

module.exports = TaoConvert;
