/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 20:28:15
 */
const { Calendar } = require("tao_calendar");

const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const { star, door, divinity, DIVINITY } = require("@/pojo/Tao.js");
const Arr = require("@/tools/index.js");

class TheArtOfBecomingInvisible extends TaoConvert {
	/**
	 * 时旬首隐旗
	 */
	#hourConceal;

	constructor(questionTime, r) {
		super();

		// step1: 根据日期转化干支历
		this.#generateCalendar(questionTime);

		// TODO
		// step2: 根据节气和上中下三元获取用局
		this.generateRound(r);

		// step3: 根据时干支获取其旬首隐旗
		this.#generateHourConcealFlag();

		// step4: 根据用局布地盘三奇六仪
		this.#overEarths();

		// step5: 根据时干支获取值使和值符
		this.#getMandateAndSymbol();

		// step6: 根据值符布天盘三奇六仪和星
		this.#overHeavens();

		// step7: 根据值使布八门
		this.#overPeoples();

		// step8: 根据值符布八神
		this.#overDivinity();
	}

	#generateCalendar(questionTime) {
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
	#generateHourConcealFlag() {
		this.#hourConceal = this.hour.getLead().getConceal(true);
	}

	/**
	 * @description 布地盘三奇六仪，阳顺阴逆
	 * @version 1.0.0
	 * @author lax
	 */
	#overEarths() {
		let round = Math.abs(this.round);
		// 用局->宫数组下标
		let index = round - 1;
		let _acquired;
		// 阳顺阴逆
		if (this.round < 0) {
			const list = Arr.arrayUp(this.acquired, index + 1);
			_acquired = Array.from(list).reverse();
		} else {
			_acquired = Arr.arrayUp(this.acquired, index);
		}
		_acquired.map((palace, i) => {
			palace.setECS([i]);
		});
		this.#generateEarths();
	}

	/**
	 * @description 布天盘九星，值符随时干，坤五寄二宫
	 * @version 1.0.0
	 * @author lax
	 */
	#overHeavens() {
		// 时干
		let hourCS = this.hour.getCsOrigin(true);
		// 时干所在地盘落宫对应的外环序号
		let hIndex = this.earths.get(hourCS).rIndex;
		// 值符落五宫寄坤二宫
		if (hIndex === 8) hIndex = 2;
		// 时辰旬首所遁宫对应的外环序号
		let eIndex = this.earths.get(this.#hourConceal).rIndex;
		// 时辰旬首落五宫寄坤二宫
		if (eIndex === 8) eIndex = 2;
		// 转距
		let offset = hIndex - eIndex;
		offset = this.#cycle(8, offset);
		// 九星携带天干转移
		const stars = this.circle.map(({ index, ecs }) => {
			return { star: index, ecs };
		});
		stars.pop();
		Arr.arrayUp(stars, -offset).map((data, index) => {
			let palace = this.circle[index];
			palace.setStar(data.star);
			palace.setHCS(data.ecs);
		});
		// TODO 天禽寄坤
		// 天禽寄二宫
		this.five.setStar(4);
		this.#generateHeavens();
		this.#generateStars();
		// 天禽寄二宫
		this.stars.get("天芮星").hcs.push(this.five.ecs[0]);
	}

	/**
	 * @description 布人盘,值使随时宫
	 * @version 1.0.0
	 * @author lax
	 */
	#overPeoples() {
		// 时地支
		const hourTb = this.hour.tb();
		// 时旬首地支
		const headTb = this.hour.getLead().tb();
		// 时辰间距
		const timeOffset = this.#cycle(12, hourTb.getValue() - headTb.getValue());
		// 时旬首所遁序号
		let index = this.earths.get(this.#hourConceal).index;
		// 阳顺阴逆
		index += timeOffset * (this.round > 0 ? 1 : -1);
		// 周期循环过滤
		index = this.#cycle(9, index);
		// 值使落五宫寄坤二宫
		if (index === 4) index = 1;
		// 值使落宫序号
		const mandatePalace = this.acquired[index].rIndex;
		const peoples = this.circle.map((palace) => {
			return palace.index;
		});
		peoples.pop();
		const offset = mandatePalace - peoples.indexOf(this.mandate);
		// 布八门
		Arr.arrayUp(peoples, -offset).map((data, i) => {
			let palace = this.circle[i];
			palace.setDoor(data);
		});
		this.#generatePeoples();
	}

	/**
	 * 布神盘
	 */
	#overDivinity() {
		// 大值符内环序号
		const symbol = this.stars.get(this.getSymbol(true)).rIndex;
		let _divinity = divinity;
		// 阳顺阴逆
		if (this.round < 0) {
			_divinity = Array.from(divinity).reverse();
		}
		let offset = symbol - _divinity.indexOf(DIVINITY.SYMBOL);
		offset = this.#cycle(8, offset);
		// 布八神
		Arr.arrayUp(_divinity, -offset).map((data, i) => {
			let palace = this.circle[i];
			// TODO index
			palace.setDivinity(divinity.indexOf(data));
		});
		this.#generateDivinity();
	}

	/**
	 * @description 获取值使和值符
	 * @version 1.0.0
	 * @author lax
	 */
	#getMandateAndSymbol() {
		// 时干支旬首所隐旗对应的后天卦序
		let index = this.earths.get(this.#hourConceal).index;
		// 值符
		this.symbol = index;
		// 值使
		// 五宫寄二宫
		if (index === 4) index = 1;
		this.mandate = index;
	}

	#generateBy(area, pro) {
		this[area] = new Map(
			this.acquired.map((palace) => {
				let tag = palace[`get${pro}`](true);
				// 天地盘作单独处理和区分
				if (tag instanceof Array) tag = tag[0];
				return [tag, palace];
			})
		);
	}

	#generateEarths() {
		this.#generateBy("earths", "ECS");
	}

	#generateHeavens() {
		this.#generateBy("heavens", "HCS");
	}

	#generateStars() {
		this.#generateBy("stars", "Star");
	}

	#generatePeoples() {
		this.#generateBy("peoples", "Door");
	}

	#generateDivinity() {
		this.#generateBy("divinity", "Divinity");
	}

	#cycle(r, v) {
		return (r + v) % r;
	}

	getSymbol(is = false) {
		return is ? star[this.symbol] : this.symbol;
	}

	getMandate(is = false) {
		return is ? door[this.mandate] : this.mandate;
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
