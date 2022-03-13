/*
 * @Description: 奇门遁甲对象
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2022-03-13 20:32:24
 */
const Calendar = require("./../cstb/Calendar");
const { ceremony, surprise, star, door } = require("./../Tao");
const Palace = require("./Palace");
const Arr = require("./../../tools/index");
// const moment = require("moment");
class TheArtOfBecomingInvisible {
	constructor(questionTime, round) {
		// step1: 根据日期转化干支历
		/**
		 * 求测阴阳历时
		 * @type {Calendar}
		 */
		this.calendar = new Calendar(questionTime);

		// step2: 根据节气和上中下三元获取用局
		/**
		 * -9~9对应阴遁九局、阳遁九局
		 */
		this.round = round || this.getRound();

		this.__init();

		// step3: 根据用局布地盘三奇六仪
		this.overEarth();

		// step4: 根据时干支获取值使和值符
		this.getMandateAndSymbol();

		// step5: 根据值符布天盘三奇六仪和星
		this.overHeaven();

		// step6: 根据值使布八门
		this.overPeople();
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

	/**
	 * 布天盘九星
	 */
	overHeaven() {
		// 时干
		let hourCS = this.calendar.hour.getCsOrigin(true);
		// 时干所在地盘落宫对应的外环序号
		const hIndex = this.earth.get(hourCS).rIndex;
		// 时辰旬首所遁宫对应的外环序号
		const eIndex = this.earth.get(ceremony[this.hideIndex]).rIndex;
		// 转距
		const offset = Math.abs(hIndex - eIndex);
		// 九星携带天干转移
		const stars = this.circle
			.map((palace) => {
				return { star: star[palace.index - 1], _hs: palace._hs };
			})
			.slice(0, star.length - 1);
		Arr.arrayUp(stars, -offset).map((data, index) => {
			let palace = this.circle[index];
			palace.setStar(data.star);
			palace.setHCS(data._hs);
		});
		// 天禽不变
		this.five.setStar("天禽星");
		this.generateHeaven();
		// 天禽随二宫
		this.heaven.get("天芮星").hs.push(this.five._hs[0]);
	}

	// TODO
	overPeople() {
		// 时地支
		const hourTb = this.calendar.hour.tb();
		// 时旬首地支
		const headTb = this.calendar.hour.getLead().tb();
		// 时辰间距
		const timeOffset = Math.abs(hourTb - headTb);
		console.log(`时间相差：${timeOffset}`);
		// 时旬首所遁环序号
		let index = this.earth.get(ceremony[this.hideIndex]).rIndex;
		if (this.round < 0) {
			index -= index;
		} else {
			index += timeOffset;
		}
		index %= 8;
		if (index < 0) index += 8;
		console.log(`：${timeOffset}`);
		let mandate = this.mandate;
		const peoples = this.circle
			.map((palace) => {
				return door[palace.index - 1];
			})
			.slice(0, star.length - 1);
		const offset = peoples.indexOf(mandate);
		console.log(peoples);
		Arr.arrayUp(peoples, -offset).map((data, i) => {
			let palace = this.circle[i];
			palace.setDoor(data);
		});
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
		this.mandate = door[index + 1];
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

	generateHeaven() {
		this.heaven = new Map(
			this.acquired.map((palace) => {
				return [palace.getStar(), palace];
			})
		);
	}

	// TODO
	getRound() {}

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

module.exports = TheArtOfBecomingInvisible;
