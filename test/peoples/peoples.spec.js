/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2023-04-28 19:04:44
 * @FilePath: \taobi\test\tao.spec.js
 */
const DOOR = require("./door");
const PEOPLES = require("./peoples");
const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const { sexagenaryCycle } = require("@/pojo/Tao.js");

describe("奇门摆盘-第六步:人盘布八门", () => {
	describe("阴9局", () => {
		const round = -9;
		for (let i = 0; i <= 59; i++) {
			const sc = sexagenaryCycle[i];
			const tao = new Tao(`壬寅壬寅辛亥${sc}`, round);
			const head = PEOPLES[`${round < 0 ? "m" : "p"}${Math.abs(round)}`][i];
			const door = DOOR[head - 1];
			it(`时干-${sc} ${door[0]}`, () => {
				const circle = tao.circle;
				circle.pop();
				circle.map((palace, index) => {
					expect(palace.getDoor(true)).toContain(door[index]);
				});
			});
		}
	});
});
