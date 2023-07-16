/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2023-07-16 10:43:26
 */
const { Calendar } = require("tao_calendar");
const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const {
	star,
	door,
	ceremony,
	surprise,
	divinity,
	DIVINITY,
} = require("@/pojo/Tao.js");
const Arr = require("@/tools/index.js");
const surpriseCeremony = ceremony.concat(surprise);
class TheArtOfBecomingInvisible extends TaoConvert {
	/**
	 * 时旬首隐旗
	 */
	#hourConceal;

	/**
	 * @description 奇门起局
	 * @param {Calendar} questionTime 求测时辰
	 * @param {Number} 用局
	 * @param {*} arranged 排盘方法，转盘/飞盘
	 * @param {*} follow 中五宫随法，寄坤二宫/宫二八宫/...
	 */
	constructor(questionTime, r, arranged, follow) {
		super(follow);

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

	#midPlace(follow = this.follow) {
		switch (follow) {
			// 寄坤二宫
			case 0:
				return 1;
			// 阳遁八宫，阴遁二宫
			case 1:
				return this.round > 0 ? 7 : 1;
			// TODO寄四维宫
			case 2:
				return 1;
			// TODO寄八节法
			case 3:
				return 1;
			default:
				return 1;
		}
	}

	#rotary(palaces, arr) {}

	/**
	 * @description 布地盘三奇六仪，用局数对应宫为戊，阳顺阴逆
	 * @version 1.0.0
	 * @author lax
	 */
	#overEarths() {
		// 用局->宫数组下标
		let index = this.round - 1;
		let _acquired = this.acquired;
		// 阳顺阴逆
		if (this.round < 0) {
			index += 1;
			_acquired = Array.from(this.acquired).reverse();
		}
		_acquired = Arr.arrayUp(_acquired, index);
		_acquired.forEach((palace, i) => {
			palace.setECS([surpriseCeremony[i]]);
		});
		this.#generateEarths();
	}

	/**
	 * @description 布天盘九星，值符随时干，坤五随宫
	 * @version 1.0.0
	 * @author lax
	 */
	#overHeavens() {
		// 时干
		let hourCS = this.hour.getCsOrigin(true);
		// 时干所在地盘落宫对应的外环序号
		let hIndex = this.earths.get(hourCS).rIndex;
		// 时辰旬首所遁宫对应的外环序号
		let eIndex = this.earths.get(this.#hourConceal).rIndex;
		// 转距
		let offset = hIndex - eIndex;
		offset = this.#cycle(8, offset);
		// 九星携带天干转移
		const stars = this.circle.map(({ index, ecs }) => {
			return { star: [index], ecs };
		});
		Arr.arrayUp(stars, -offset).map((data, index) => {
			let palace = this.circle[index];
			palace.setStar(data.star);
			palace.setHCS(data.ecs);
		});
		const p = this.acquired[this.#midPlace()];
		p.setStar("天禽星", true);
		p.setHCS(this.five.ecs[0], true);
		this.#generateHeavens();
		this.#generateStars();
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
		// 五宫随
		if (index === 4) index = this.#midPlace();
		// 值使
		this.mandate = index;
		// 随宫修正转盘计数
		this.five.rIndex = this.acquired[this.#midPlace()].rIndex;
	}

	#generateBy(area, pro) {
		this[area] = new Map(
			this.acquired.reduce((acc, next) => {
				let tag = next[`get${pro}`](true);
				tag = [].concat(tag);
				tag = tag.map((t) => [t, next]);
				return acc.concat(tag);
			}, [])
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
