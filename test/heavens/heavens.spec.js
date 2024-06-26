/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:56:50
 * @FilePath: \taobi\test\tao.spec.js
 */
const STAR = require("./star");
const HEAVENS = require("./heavens");
const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const { SC_ARR } = require("tao_name");

describe("奇门摆盘-第五步:天盘布九星", () => {
	for (let i = -9; i < 10; i++) {
		if (i) {
			describe(`${i}局`, () => {
				for (let j = 0; j < 10; j++) {
					const sc = SC_ARR[j];
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
