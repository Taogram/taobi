/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-08-15 23:23:47
 * @LastEditors: lax
 * @LastEditTime: 2024-02-09 12:20:05
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
				const r = new Taobi(new Date(time)).generateRound(null, j);
				const element = ["上", "中", "下"];
				it(`${element[j]}元-用局：${r}`, () => {
					expect(r).toBe(result[i][j]);
				});
			}
		});
	});
});

// describe("拆补法", () => {
// 	const time = "2024-01-19 11:31:38";
// 	describe(`时间:${time}`, () => {
// 		const r = new Taobi(new Date(time), null, null, null, {
// 			element: 1,
// 		}).generateElement();
// 		const element = ["上", "中", "下"];
// 		it(`${element[r]}元`, () => {
// 			expect(r).toBe(0);
// 		});
// 	});
// });
