/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2023-07-16 11:17:09
 * @FilePath: \taobi\test\tao.spec.js
 */
const STAR = require("./star");
const HEAVENS = require("./heavens");
const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const { sexagenaryCycle } = require("@/pojo/Tao.js");

describe("奇门摆盘-第五步:天盘布九星", () => {
	for (let i = -9; i < 10; i++) {
		if (i !== 0) {
			describe(`${i}局`, () => {
				for (let j = 0; j < 10; j++) {
					const sc = sexagenaryCycle[j];
					const tao = new Tao(["壬寅", "壬寅", "辛亥", `${sc}`], i);
					const head = HEAVENS[`${i < 0 ? "m" : "p"}${Math.abs(i)}`][j];
					const star = STAR[head - 1];
					it(`时干-${sc} ${star.toString()}`, () => {
						const circle = tao.circle;
						circle.pop();
						circle.map((palace, index) => {
							expect(palace.getStar(true).toString()).toContain(star[index]);
						});
					});
				}
			});
		}
	}
});
