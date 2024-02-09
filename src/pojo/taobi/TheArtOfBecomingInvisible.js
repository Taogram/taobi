/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2024-02-09 11:50:37
 */
const { Calendar } = require("tao_calendar");
const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const Star = require("@/pojo/taobi/Star");
const Door = require("@/pojo/taobi/Door");
const Divinity = require("@/pojo/taobi/Divinity");
const { ceremony, surprise } = require("@/pojo/Tao.js");
const Arr = require("@/tools/index.js");
const surpriseCeremony = ceremony.concat(surprise);
const { Ecliptic } = require("solar_terms.js");
const Julian = require("julian.js");
class TheArtOfBecomingInvisible extends TaoConvert {
	/**
	 * 时旬首隐旗
	 */
	#hourConceal;

	/**
	 * 地心黄经
	 * @type {Number}
	 */
	#longitude;

	/**
	 * @description 奇门起局
	 * @param {Calendar} questionTime 求测时辰
	 * @param {Number} r 用局
	 * @param {*} arranged 排盘方法，转盘/飞盘
	 * @param {*} follow 中五宫随法，寄坤二宫/宫二八宫/...
	 * @param {Object} options 配置项
	 */
	constructor(questionTime, r, arranged, follow = 0, options) {
		super(options);

		this.follow = follow;

		// step1: 根据日期转化干支历
		this.#generateCalendar(questionTime);

		// TODO
		// step2: 根据节气和上中下三元获取用局
		this.round = this.generateRound(r);

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
		if (questionTime instanceof Date) {
			const jd = new Julian(questionTime).getJD();
			let l = new Ecliptic(jd).getSunEclipticLongitude();
			l = ((l % 360) + 360) % 360;
			this.#longitude = l;
		}
		this.calendar = new Calendar(questionTime);
		const { year, month, date, hour } = this.calendar;
		this.year = year;
		this.month = month;
		this.date = date;
		this.hour = hour;
	}

	/**
	 * @description 落宫节气之首用局为宫数，余气按阴阳递进加减
	 * 三元则六甲一旬
	 * @param {Number} r 用局数
	 * @param {Number} element 上中下元
	 */
	generateRound(r, element = this.generateElement()) {
		if (!this.#longitude && !r)
			throw new Error("传入时辰为干支时，用局为必填项，否则无法起盘");
		if (typeof r === "number") return r;
		// 坎一转至乾六
		const ACQUIRED_INDEX = [1, 8, 3, 4, 9, 2, 7, 6];
		// 节气角度 0~23
		const rotate = ~~(this.#longitude / 15);
		// 节气宫序列 节气落宫
		const index = ~~((rotate / 3 + 2) % 8);
		// 宫中节气序数
		const pl = rotate % 3;
		// 阴/阳遁
		const yy = index < 4 ? 1 : -1;

		let round = ACQUIRED_INDEX[index] + yy * pl;
		round = (round + yy * 6 * element + 17) % 9;
		round += 1;
		return round * yy;
	}

	/**
	 * @description 生成上中下元
	 */
	generateElement() {
		switch (this.options.element) {
			// 均分法
			default:
				return ~~(this.#longitude / 5) % 3;
			// 拆补法
			case 1:
				return ~~(this.hour.index / 5) % 3;
			// 茅山法
			case 2:
				return 0;
			// 置润法
			case 3:
				return 0;
		}
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
	 * @description 中宫所寄宫
	 * 二宫/二八宫/四维宫/八节
	 * @param {Number} follow
	 * @returns index
	 */
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

	// TODO
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
		// 转盘序列起始->时干所在地盘落宫对应的外环序号
		let hIndex = this.earths.get(hourCS).rIndex;
		// 时辰旬首所遁宫对应的外环序号
		let eIndex = this.earths.get(this.#hourConceal).rIndex;
		// 转距
		let offset = eIndex - hIndex;
		offset = this.#cycle(8, offset);
		// 九星携带天干转移
		const stars = this.circle.map(({ index, ecs }) => {
			return { star: [index], ecs };
		});
		Arr.arrayUp(stars, offset).map((data, index) => {
			let palace = this.circle[index];
			palace.setStar(data.star);
			palace.setHCS(data.ecs);
		});
		// 中宫随宫
		const r = this.acquired[this.#midPlace()].rIndex;
		const p = this.circle[this.#cycle(8, r - offset)];
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
		// 值使落宫序号
		const mandatePalace = this.acquired[index].rIndex;
		const peoples = this.circle.map((palace) => {
			return palace.index;
		});
		const offset = peoples.indexOf(this.mandate) - mandatePalace;
		// 布八门
		Arr.arrayUp(peoples, offset).map((data, i) => {
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
		let _divinity = Divinity.DIVINITY;
		// 阳顺阴逆
		if (this.round < 0) {
			_divinity = Array.from(_divinity).reverse();
		}
		// TODO DIVINITY.SYMBOL
		let offset = symbol - _divinity.indexOf(Divinity.DIVINITY[0]);
		offset = this.#cycle(8, offset);
		// 布八神
		Arr.arrayUp(_divinity, -offset).map((data, i) => {
			let palace = this.circle[i];
			// TODO index
			palace.setDivinity(Divinity.DIVINITY.indexOf(data));
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

	// TODO
	getSymbol(is = false) {
		return is ? Star.STAR[this.symbol] : this.symbol;
	}

	getMandate(is = false) {
		return is ? Door.DOOR[this.mandate] : this.mandate;
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
