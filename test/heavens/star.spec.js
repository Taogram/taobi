/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:30:22
 */
const Star = require("@/pojo/taobi/Star");
const { STAR_ARR } = require("tao_name");
const STAR_PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
describe("奇门-九星", () => {
	for (let i = 0; i <= 8; i++) {
		const star = new Star(i);
		it(`${STAR_ARR[i]},${STAR_PHASES[i]}`, () => {
			expect(star.getIndex()).toBe(i);
			expect(star.getPhases(true)).toBe(STAR_PHASES[i]);
		});
	}
});
