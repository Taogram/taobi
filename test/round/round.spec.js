/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-08-15 23:23:47
 * @LastEditors: lax
 * @LastEditTime: 2024-09-16 13:12:05
 */
const moment = require("moment");
const { SolarTerms } = require("solar_terms.js");
const arr = new SolarTerms().getSolarTermsAll(2022).map((time) => {
	return moment(time).add(15, "m").format("YYYY-MM-DD HH:mm:ss");
});
const name = require("./solarTerms");
const Taobi = require("@/pojo/taobi/TheArtOfBecomingInvisible");
const result = [
	[2, 8, 5],
	[3, 9, 6],
	[8, 5, 2],
	[9, 6, 3],
	[1, 7, 4],
	[3, 9, 6],
	[4, 1, 7],
	[5, 2, 8],
	[4, 1, 7],
	[5, 2, 8],
	[6, 3, 9],
	[-9, -3, -6],
	[-8, -2, -5],
	[-7, -1, -4],
	[-2, -5, -8],
	[-1, -4, -7],
	[-9, -3, -6],
	[-7, -1, -4],
	[-6, -9, -3],
	[-5, -8, -2],
	[-6, -9, -3],
	[-5, -8, -2],
	[-4, -7, -1],
	[1, 7, 4],
];
describe("用局表", () => {
	arr.map((time, i) => {
		describe(`时间:${time}-节气${name[i]}`, () => {
			for (let j = 0; j < 3; j++) {
				const r = new Taobi(new Date(time), null, null, null, { element: j })
					.round;
				const element = ["上", "中", "下"];
				it(`${element[j]}元-用局：${r}`, () => {
					expect(r).toBe(result[i][j]);
				});
			}
		});
	});
});

// TODO  均分法 可不测试

/**
 * 子午卯酉为上元
 * 寅申巳亥为中元
 * 辰戌丑未为下元
 */
describe("拆补法", () => {
	const ANS = [
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
		2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
	];
	for (let i = 0; i < 60; i++) {
		const taobi = new Taobi(
			moment(new Date()).add(i, "d").toDate(),
			null,
			null,
			null,
			{
				elements: 1,
			}
		);
		const DATE = taobi.date.cstb(true);
		const ELE = taobi.ELEMENTS[1];
		const palace = ["上", "中", "下"];
		it(`${DATE}日-${palace[ELE]}元`, () => {
			expect(ELE).toBe(ANS[taobi.date.index]);
		});
	}
});

// TODO  茅山法待测试
