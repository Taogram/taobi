/*
 * @Description: 奇门遁甲对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 11:45:30
 */
const Calendar = require("./../cstb/Calendar");
const { ceremony, surprise, star, people } = require("./../Tao");
const Palace = require("./Palace");
const Arr = require("./../../tools/index");
// const moment = require("moment");
class TheArtOfBecomingInvisible {
	constructor(questionTime, round) {
		/**
		 * step1:
		 * 根据日期转化干支历
		 */
		this.calendar = new Calendar(questionTime);

		/**
		 * step2:
		 * 根据节气和上中下三元获取用局
		 * -9~9对应阴遁九局、阳遁九局
		 */
		this.round = round || this.getRound();

		this.__init();

		/**
		 * step3:
		 * 根据用局布地盘三奇六仪
		 */
		this.overEarth();

		/**
		 * step4:
		 * 根据时干支获取值使和值符
		 */
		this.getMandateAndSymbol();

		/**
		 * step5:
		 * 根据值符布天盘三奇六仪和星
		 */
		this.overHeaven();
	}

	__init() {
		this.generatePalace();
		this.generateAcquiredPalace();
		this.generateNinePalace();
		this.generateCirclePalace();
	}

	/**
	 * 布地盘三奇六仪
	 */
	overEarth() {
		const surpriseCeremony = ceremony.concat(surprise);
		let acquired = this.acquired;
		let index = Math.abs(this.round) - 1;
		// 阳顺阴逆
		if (this.round < 0) {
			acquired = Array.from(acquired).reverse();
			index = 9 - Math.abs(this.round);
		}
		Arr.arrayUp(acquired, index).map((palace, i) => {
			palace.setECS([surpriseCeremony[i]]);
		});
		this.generateEarth();
	}

	// TODO
	overHeaven() {
		// 时干
		const hourCS = this.calendar.hour.cs(true);
		// 时干所在外环的序号
		const hIndex = this.earth.get(hourCS).rIndex;
		const eIndex = this.earth.get(ceremony[this.hideIndex].rIndex);
		console.log(hIndex);
		console.log(eIndex);

		const stars = this.circle
			.map((palace) => {
				return star[palace.index - 1];
			})
			.slice(0, star.length - 1);
		Arr.arrayUp(stars);
	}

	// TODO
	getMandateAndSymbol() {
		// 时干支旬首所隐旗序号
		const hideIndex = this.calendar.hour.getLead().getHide();
		this.hideIndex = hideIndex;
		// 对应的后天卦序
		const index = this.earth.get(ceremony[hideIndex]).index;
		// 值符
		this.symbol = star[index + 1];
		// 值使
		this.mandate = people[index + 1];
	}

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

	generateNinePalace() {
		this.box = [
			[this.four, this.nine, this.two],
			[this.three, this.five, this.seven],
			[this.eight, this.one, this.six],
		];
	}

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

	// TODO
	generateEarth() {
		this.earth = new Map(
			this.acquired.map((palace) => {
				return [palace.getECS()[0], palace];
			})
		);
	}

	// TODO
	getRound() {}
}

module.exports = TheArtOfBecomingInvisible;
