/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2022-03-19 16:12:54
 */
const Calendar = require("@/pojo/cstb/Calendar.js");
const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const { ceremony, surprise, star, door } = require("@/pojo/Tao.js");
const Arr = require("./../../tools/index");
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
		// this.overPeople();
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
			palace.setECS([surpriseCeremony[i]]);
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
		const hIndex = this.earth.get(hourCS).rIndex;
		// 时辰旬首所遁宫对应的外环序号
		const eIndex = this.earth.get(this.hourConceal).rIndex;
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
		const hourTb = this.hour.tb();
		// 时旬首地支
		const headTb = this.hour.getLead().tb();
		// 时辰间距
		const timeOffset = Math.abs(hourTb - headTb);
		// 时旬首所遁环序号
		let index = this.earth.get(this.hourConceal).index;
		// 阳顺阴逆
		index += timeOffset * (this.round > 0 ? 1 : -1);
		// 周期循环过滤
		index %= SPIN_CYCLE;
		// 取正序
		if (index < 0) index += 8;
		// 值使落宫序号
		const mandatePalace = this.acquired[index - 1].rIndex;
		const peoples = this.circle
			.map((palace) => {
				return door[palace.index - 1];
			})
			.slice(0, star.length - 1);
		const offset = mandatePalace - peoples.indexOf(this.mandate);
		console.log(offset);
		Arr.arrayUp(peoples, -offset).map((data, i) => {
			let palace = this.circle[i];
			palace.setDoor(data);
		});
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
		this.symbol = star[index + 1];
		// 值使
		this.mandate = door[index + 1];
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
