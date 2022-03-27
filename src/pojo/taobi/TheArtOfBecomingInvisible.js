/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2022-03-27 20:30:20
 */
const Calendar = require("@/pojo/cstb/Calendar.js");
const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const {
	ceremony,
	surprise,
	star,
	door,
	divinity,
	DIVINITY,
} = require("@/pojo/Tao.js");
const Arr = require("@/tools/index.js");
// const moment = require("moment");
/**
 * 转盘周期
 */
const SPIN_CYCLE = 8;
class TheArtOfBecomingInvisible extends TaoConvert {
	constructor(questionTime, r) {
		super();

		/**
		 * 时旬首隐旗
		 */
		this.hourConceal = null;

		// step1: 根据日期转化干支历
		this.generateCalendar(questionTime);

		// TODO
		// step2: 根据节气和上中下三元获取用局
		this.generateRound(r);

		// step3: 根据时干支获取其旬首隐旗
		this.generateHourConcealFlag();

		// step4: 根据用局布地盘三奇六仪
		this.overEarth();

		// step5: 根据时干支获取值使和值符
		this.getMandateAndSymbol();

		// step6: 根据值符布天盘三奇六仪和星
		this.overHeaven();

		// step7: 根据值使布八门
		this.overPeople();

		// step8: 根据值符布八神
		this.overDivinity();
	}

	generateCalendar(questionTime) {
		this.calendar = new Calendar(questionTime);
		const { year, month, date, hour } = this.calendar;
		this.year = year;
		this.month = month;
		this.date = date;
		this.hour = hour;
	}

	// TODO
	generateRound(r) {
		this.round = r === undefined ? 3 : r;
	}

	/**
	 * @description 时干支旬首所隐旗
	 * @version 1.0.0
	 * @author lax
	 */
	generateHourConcealFlag() {
		this.hourConceal = this.hour.getLead().getConceal(true);
	}

	/**
	 * @description 布地盘三奇六仪
	 * @version 1.0.0
	 * @author lax
	 */
	overEarth() {
		const surpriseCeremony = ceremony.concat(surprise);
		let _acquired = this.acquired;
		let round = Math.abs(this.round);
		let index = round - 1;
		// 阳顺阴逆
		if (this.round < 0) {
			_acquired = Array.from(_acquired).reverse();
			index = 9 - round;
		}
		Arr.arrayUp(_acquired, index).map((palace, i) => {
			palace.setECS(surpriseCeremony[i]);
		});
		this.generateEarth();
	}

	/**
	 * 布天盘九星
	 */
	overHeaven() {
		// 时干
		let hourCS = this.hour.getCsOrigin(true);
		// 时干所在地盘落宫对应的外环序号
		let hIndex = this.earth.get(hourCS).rIndex;
		// 值符落五宫寄坤二宫
		if (hIndex === 8) hIndex = 2;
		// 时辰旬首所遁宫对应的外环序号
		const eIndex = this.earth.get(this.hourConceal).rIndex;
		// 转距
		const offset = (8 + (hIndex - eIndex)) % 8;
		// 九星携带天干转移
		const stars = this.circle
			.map((palace) => {
				return { star: star[palace.index - 1], _hs: palace._hs };
			})
			.slice(0, star.length - 1);
		Arr.arrayUp(stars, -offset).map((data, index) => {
			let palace = this.circle[index];
			palace.setStar(data.star);
			palace.setHCS([data._hs]);
		});
		// 天禽不变
		this.five.setStar("天禽星");
		this.generateHeaven();
		// 天禽寄二宫
		this.heaven.get("天芮星").hs.push(this.five._hs);
	}

	/**
	 * 布人盘
	 */
	overPeople() {
		// 时地支
		const hourTb = this.hour.tb();
		// 时旬首地支
		const headTb = this.hour.getLead().tb();
		// 时辰间距
		const timeOffset = (12 + (hourTb - headTb)) % 12;
		// 时旬首所遁序号
		let index = this.earth.get(this.hourConceal).index;
		// 阳顺阴逆
		index += timeOffset * (this.round > 0 ? 1 : -1);
		// 周期循环过滤
		index = (index + 9) % 9;
		// 值使落宫序号
		const mandatePalace = this.acquired[index - 1].rIndex;
		const peoples = this.circle
			.map((palace) => {
				return door[palace.index - 1];
			})
			.slice(0, star.length - 1);
		const offset = mandatePalace - peoples.indexOf(this.mandate);
		// 布八门
		Arr.arrayUp(peoples, -offset).map((data, i) => {
			let palace = this.circle[i];
			palace.setDoor(data);
		});
		this.generatePeople();
	}

	/**
	 * 布神盘
	 */
	overDivinity() {
		// 大值符内环序号
		const symbol = this.heaven.get(this.symbol).rIndex;
		let _divinity = divinity;
		// 阳顺阴逆
		if (this.round < 0) {
			_divinity = Array.from(divinity).reverse();
		}
		let offset = symbol - _divinity.indexOf(DIVINITY.SYMBOL);
		offset = (offset + 8) % 8;
		// 布八神
		Arr.arrayUp(_divinity, -offset).map((data, i) => {
			let palace = this.circle[i];
			palace.setDivinity(data);
		});
		this.generateDivinity();
	}

	/**
	 * @description 获取值使和值符
	 * @version 1.0.0
	 * @author lax
	 */
	getMandateAndSymbol() {
		/**
		 * 时干支旬首所隐旗对应的后天卦序
		 */
		const index = this.earth.get(this.hourConceal).index;
		// 值符
		this.symbol = star[index - 1];
		// 值使
		this.mandate = door[index - 1];
	}

	generateBy(area, pro) {
		this[area] = new Map(
			this.acquired.map((palace) => {
				return [palace[`get${pro}`](), palace];
			})
		);
	}

	generateEarth() {
		this.generateBy("earth", "ECS");
	}

	generateHeaven() {
		this.generateBy("heaven", "Star");
	}

	generatePeople() {
		this.generateBy("people", "Door");
	}

	generateDivinity() {
		this.generateBy("divinity", "Divinity");
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

module.exports = TheArtOfBecomingInvisible;
