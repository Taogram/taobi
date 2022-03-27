/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-28 19:51:37
 * @LastEditors: lax
 * @LastEditTime: 2022-03-27 20:00:50
 */
module.exports = {
	/**
	 * 天干：
	 * 十天干，按标准顺序排列。
	 */
	celestialStems: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
	CELESTIAL_STEMS: {
		METH: "甲",
		ETH: "乙",
		PROP: "丙",
		BUT: "丁",
		PENT: "戊",
		HEX: "己",
		HEPT: "庚",
		OCT: "辛",
		NON: "壬",
		DEC: "癸",
	},

	/**
	 * 地支：
	 * 十二地支，按标准顺序排列。
	 */
	terrestrialBranches: [
		"子",
		"丑",
		"寅",
		"卯",
		"辰",
		"巳",
		"午",
		"未",
		"申",
		"酉",
		"戌",
		"亥",
	],
	TERRESTRIAL_BRANCHES: {
		JAN: "子",
		FEB: "丑",
		MAR: "寅",
		APR: "卯",
		MAY: "辰",
		JUN: "巳",
		JUL: "午",
		AUG: "未",
		SEPT: "申",
		OCT: "酉",
		NOV: "戌",
		DEC: "亥",
	},

	/**
	 * 六十天干地支
	 */
	sexagenaryCycle: [
		"甲子",
		"乙丑",
		"丙寅",
		"丁卯",
		"戊辰",
		"己巳",
		"庚午",
		"辛未",
		"壬申",
		"癸酉",
		"甲戌",
		"乙亥",
		"丙子",
		"丁丑",
		"戊寅",
		"己卯",
		"庚辰",
		"辛巳",
		"壬午",
		"癸未",
		"甲申",
		"乙酉",
		"丙戌",
		"丁亥",
		"戊子",
		"己丑",
		"庚寅",
		"辛卯",
		"壬辰",
		"癸巳",
		"甲午",
		"乙未",
		"丙申",
		"丁酉",
		"戊戌",
		"己亥",
		"庚子",
		"辛丑",
		"壬寅",
		"癸卯",
		"甲辰",
		"乙巳",
		"丙午",
		"丁未",
		"戊申",
		"己酉",
		"庚戌",
		"辛亥",
		"壬子",
		"癸丑",
		"甲寅",
		"乙卯",
		"丙辰",
		"丁巳",
		"戊午",
		"己未",
		"庚申",
		"辛酉",
		"壬戌",
		"癸亥",
	],
	SEXAGENARY_CYCLE: {
		MATH_JAN: "甲子",
		ETH_FEB: "乙丑",
		PROP_MAR: "丙寅",
		BUT_APR: "丁卯",
		PENT_MAY: "戊辰",
		HEX_JUN: "己巳",
		HEPT_JUL: "庚午",
		OCT_AUG: "辛未",
		NON_SEPT: "壬申",
		DEC_OCT: "癸酉",
		MATH_NOV: "甲戌",
		ETH_DEC: "乙亥",
		PROP_JAN: "丙子",
		BUT_FEB: "丁丑",
		PENT_MAR: "戊寅",
		HEX_APR: "己卯",
		HEPT_MAY: "庚辰",
		OCT_JUN: "辛巳",
		NON_JUL: "壬午",
		DEC_AUG: "癸未",
		METH_SEPT: "甲申",
		ETH_OCT: "乙酉",
		PROP_NOV: "丙戌",
		BUT_DEC: "丁亥",
		PENT_JAN: "戊子",
		HEX_FEB: "己丑",
		HEPT_MAR: "庚寅",
		OCT_APR: "辛卯",
		NON_MAY: "壬辰",
		DEC_JUN: "癸巳",
		METH_JUL: "甲午",
		ETH_AUG: "乙未",
		PROP_SEPT: "丙申",
		BUT_OCT: "丁酉",
		PENT_NOV: "戊戌",
		HEX_DEC: "己亥",
		HEPT_JAN: "庚子",
		OCT_FEB: "辛丑",
		NON_MAR: "壬寅",
		DEC_APR: "癸卯",
		METH_MAY: "甲辰",
		ETH_JUN: "乙巳",
		PROP_JUL: "丙午",
		BUT_AUG: "丁未",
		PENT_SEPT: "戊申",
		HEX_OCT: "己酉",
		HEPT_NOV: "庚戌",
		OCT_DEC: "辛亥",
		NON_JAN: "壬子",
		DEC_FEB: "癸丑",
		METH_MAR: "甲寅",
		ETH_APR: "乙卯",
		PROP_MAY: "丙辰",
		BUT_JUN: "丁巳",
		PENT_JUL: "戊午",
		HEX_AUG: "己未",
		HEPT_SEPT: "庚申",
		OCT_OCT: "辛酉",
		NON_NOV: "壬戌",
		DEC_DEC: "癸亥",
	},

	/**
	 * 六仪：
	 * 为十天干中的戌、己、庚、辛、壬、癸。
	 * 对应为六只仪仗队，六甲将分别隐喻六仪之中
	 */
	ceremony: ["戊", "己", "庚", "辛", "壬", "癸"],
	CEREMONY: {
		PENT: "戊",
		HEX: "己",
		HEPT: "庚",
		OCT: "辛",
		NON: "壬",
		DEC: "癸",
	},

	/**
	 * 三奇：
	 * 为十天干中的乙、丙、丁。
	 * 对应三奇，分别为日奇，掌文、月奇，善武，星奇，粮草。
	 */
	surprise: ["丁", "丙", "乙"],
	SURPRISE: {
		BUT: "丁",
		PROP: "丙",
		ETH: "乙",
	},

	/**
	 * 后天八卦：
	 */
	acquired: ["坎", "坤", "震", "巽", "中", "乾", "兑", "艮", "离"],
	// TODO
	ACQUIRED: {
		KAN: "坎",
		EARTH: "坤",
		SHAKE: "震",
		XUN: "巽",
		MID: "中",
		HEAVEN: "乾",
		DUI: "兑",
		GEN: "艮",
		LEAVE: "离",
	},

	/**
	 * 数字
	 */
	num: ["一", "二", "三", "四", "五", "六", "七", "八", "九"],

	/**
	 * 九星：
	 */
	star: [
		"天蓬星",
		"天芮星",
		"天冲星",
		"天辅星",
		"天禽星",
		"天心星",
		"天柱星",
		"天任星",
		"天英星",
	],

	/**
	 * 八门：
	 */
	door: ["休门", "死门", "伤门", "杜门", "", "开门", "惊门", "生门", "景门"],

	/**
	 * 八神
	 */
	divinity: ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"],
	// TODO
	DIVINITY: {
		SYMBOL: "值符",
	},
};
