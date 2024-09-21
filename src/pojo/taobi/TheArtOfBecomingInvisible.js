/*
 * @Description: 奇门遁甲
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-27 17:14:22
 * @LastEditors: lax
 * @LastEditTime: 2024-09-21 10:23:22
 */
const SOLAR_TERMS = require("@/pojo/taobi/solarTerms");
const { Calendar } = require("tao_calendar");
const TaoConvert = require("@/pojo/taobi/TaoConvert.js");
const Star = require("@/pojo/taobi/Star");
const Door = require("@/pojo/taobi/Door");
const Divinity = require("@/pojo/taobi/Divinity");
const { CEREMONY_ARR, SURPRISE_ARR } = require("tao_name");
const Arr = require("@/tools/index.js");
const surpriseCeremony = CEREMONY_ARR.concat(SURPRISE_ARR);
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
	 * @version 1.0.0
	 * @author lax
	 */
	constructor(questionTime, r, arranged, follow = 0, options) {
		console.debug("**** start to generate ****");
		// TODO options and r/arranged/follow...
		super(options);

		this.follow =
			this.OPTIONS.follow === undefined ? follow : this.OPTIONS.follow;

		console.debug("**** step 1 generate calendar  ****");
		// step1: 根据日期转化干支历
		this.#generateCalendar(questionTime);

		console.debug("**** step 2 generate round ****");
		// step2: 根据节气和上中下三元获取用局
		this.round = this.#generateRound(r);

		console.debug("**** step 3 ****");
		// step3: 根据时干支获取其旬首隐旗
		this.#generateHourConcealFlag();

		console.debug("**** step 4 ****");
		// step4: 根据用局布地盘三奇六仪
		this.#overEarths();

		console.debug("**** step 5 ****");
		// step5: 根据时干支获取值使和值符
		this.#getMandateAndSymbol();

		console.debug("**** step 6 ****");
		// step6: 根据值符布天盘三奇六仪和星
		this.#overHeavens();

		console.debug("**** step 7 ****");
		// step7: 根据值使布八门
		this.#overPeoples();

		console.debug("**** step 8 ****");
		// step8: 根据值符布八神
		this.#overDivinity();

		console.debug("**** generate end ****");
	}

	/**
	 * @description 生成干支历
	 * @check FALSE
	 * @param {Date/String} questionTime
	 * @version 1.0.0
	 * @author lax
	 */
	#generateCalendar(questionTime) {
		console.debug(`get questionTime: ${questionTime}`);
		const t = Date.parse(questionTime);
		this.calendar = new Calendar(questionTime);
		const { year, month, date, hour, during, l } = this.calendar;
		this.year = year;
		this.month = month;
		this.date = date;
		this.hour = hour;
		this.time = new Date(questionTime);
		this.during = during;
		if (t) {
			this.#longitude = ((l % 360) + 360) % 360;
			this.solarTerms = (~~(this.#longitude / 15) + 5) % 24;
		}
	}

	/**
	 * @description 落宫节气之首用局为宫数，余气按阴阳递进加减
	 * 三元则六甲一旬
	 * @check TRUE
	 * @param {Number} r 用局数
	 * @param {Number} element 上中下元
	 * @returns {Number} round 用局数
	 * @version 1.0.0
	 * @author lax
	 */
	#generateRound(r, element = this.#generateElement()) {
		/**
		 * 若无指定用局数且未传入公历时间，则无法起盘，返回报错
		 */
		if (!this.#longitude && !r)
			throw new Error("传入时辰为干支时，用局为必填项，否则无法起盘");
		/**
		 * 若直接指定用局数则直接处理返回
		 * 正整数表示阳局，范围1~9
		 * 负整数表示阴局，范围-1~-9
		 * 无论正负，若超过10则取余
		 * 若用局为0，则默认 = 1
		 */
		if (typeof r === "number") return r % 10 === 0 ? 1 : r % 10;

		/**
		 * 若传入公历时间，则自动计算对应的用局
		 */
		// 坎一转至乾六
		const ACQUIRED_INDEX = [1, 8, 3, 4, 9, 2, 7, 6];
		/**
		 * 节气角度 0~23
		 * 根据公历时间计算得到的太阳地心视黄经均分而得，即地球公转的角度
		 * 每一节气对应15°，0°对应春分
		 */
		const rotate = ~~(this.#longitude / 15);
		/**
		 * 按奇门遁甲用局表，计算节气宫序列
		 * 一宫三节气，故rotate / 3
		 * 又起点为坎宫小寒，与春分差2，故偏移2个单位
		 */
		const index = ~~((rotate / 3 + 2) % 8);
		// 宫中节气序数，为一宫中从左往右排列的第几个节气
		const pl = rotate % 3;
		// 阴/阳遁，按前四宫为阴，后四宫为阳计算
		const yy = index < 4 ? 1 : -1;

		// 取落宫卦数为该宫第三节气上元之数，计算对应所需第几节气的上元之数
		let round = ACQUIRED_INDEX[index] + yy * pl;
		// 同节气三元每元差值为6，按阴负阳正计算
		round = (round + yy * 6 * element + 17) % 9;
		round += 1;
		round *= yy;
		console.debug(`用局：${round}`);
		return round;
	}

	/**
	 * @description 生成上中下元
	 * @check FALSE
	 * @version 1.0.0
	 * @author lax
	 */
	#generateElement(e) {
		/**
		 * 若传入为干支历，则无需计算三元
		 */
		if (!this.#longitude) return 0;
		/**
		 * 均分法
		 * 按节气时长完全均分计算
		 */
		const AVERAGE = ~~(this.#longitude / 5) % 3;
		/**
		 * 拆补法
		 * 遵循六十甲子循环
		 * 子午卯酉为上元
		 * 寅申巳亥为中元
		 * 辰戌丑未为下元
		 */
		const SPLIT = ~~(this.date.index / 5) % 3;
		/**
		 * 茅山法
		 * 根据当前时间与节气所差计算
		 */
		// todo test
		let MAO = ~~(
			(this.time.getTime() - this.during[this.solarTerms].getTime()) /
			(24 * 60 * 60 * 1000) /
			5
		);
		MAO = MAO > 2 ? 2 : MAO;
		// 置润法 暂不使用，也不建议用
		const LEAP = 0;
		this.ELEMENTS = [AVERAGE, SPLIT, MAO, LEAP];

		if (this.OPTIONS.element) return this.OPTIONS.element % 3;
		let use = e || this.OPTIONS.elements;
		console.debug(`三元取法：${use % 4}`);
		return this.ELEMENTS[use % 4];
	}

	/**
	 * @description 时干支旬首所隐旗
	 * @check TRUE
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
	 * @check FALSE
	 * @version 1.0.0
	 * @author lax
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

	// TODO转盘
	#rotary(palaces, arr) {}

	/**
	 * @description 布地盘三奇六仪，用局数对应宫为戊，阳顺阴逆
	 * @check TRUE
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
	 * @check TRUE
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
	 * @check TRUE
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
	 * @description 布神盘
	 * @check FALSE
	 * @version 1.0.0
	 * @author lax
	 */
	#overDivinity() {
		// 大值符内环序号
		const symbol = this.stars.get(this.getSymbol(true)).rIndex;
		let _divinity = Divinity.DIVINITY_ARR;
		// 阳顺阴逆
		if (this.round < 0) {
			_divinity = Array.from(_divinity).reverse();
		}
		// TODO DIVINITY.SYMBOL
		let offset = symbol - _divinity.indexOf(Divinity.DIVINITY_ARR[0]);
		offset = this.#cycle(8, offset);
		// 布八神
		Arr.arrayUp(_divinity, -offset).map((data, i) => {
			let palace = this.circle[i];
			// TODO index
			palace.setDivinity(Divinity.DIVINITY_ARR.indexOf(data));
		});
		this.#generateDivinity();
	}

	/**
	 * @description 获取值使和值符
	 * @check TRUE
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
		return is ? Star.STAR_ARR[this.symbol] : this.symbol;
	}

	getMandate(is = false) {
		return is ? Door.STAR_ARR[this.mandate] : this.mandate;
	}

	getSolarTerms(is = false) {
		return is ? SOLAR_TERMS[this.solarTerms] : this.solarTerms;
	}
}

module.exports = TheArtOfBecomingInvisible;
