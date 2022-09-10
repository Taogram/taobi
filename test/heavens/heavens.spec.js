/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2022-09-10 10:30:18
 * @FilePath: \taobi\test\tao.spec.js
 */
const STAR = require("./star");
const HEAVENS = require("./heavens");
const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const { sexagenaryCycle } = require("@/pojo/Tao.js");

describe("奇门摆盘-第五步:天盘布九星", () => {
	describe("阴9局", () => {
		const round = -9;
		for (let i = 0; i <= 59; i++) {
			const sc = sexagenaryCycle[i];
			const tao = new Tao(`壬寅壬寅辛亥${sc}`, round);
			const head = HEAVENS[`${round < 0 ? "m" : "p"}${Math.abs(round)}`][i];
			const star = STAR[head - 1];
			it(`时干-${sc} ${star[0]}`, () => {
				const circle = tao.circle;
				circle.pop();
				circle.map((palace, index) => {
					expect(palace.getStar()).toContain(star[index]);
				});
			});
		}
	});

	describe("阴8局", () => {
		for (let i = 0; i <= 59; i++) {
			const round = -8;
			const sc = sexagenaryCycle[i];
			const tao = new Tao(`壬寅壬寅辛亥${sc}`, round);
			const head = HEAVENS[`${round < 0 ? "m" : "p"}${Math.abs(round)}`][i];
			const star = STAR[head - 1];
			it(`时干-${sc} ${star[0]}`, () => {
				const circle = tao.circle;
				circle.pop();
				circle.map((palace, index) => {
					expect(palace.getStar()).toContain(star[index]);
				});
			});
		}
	});
});
