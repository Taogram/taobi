/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 19:44:58
 */
const Star = require("@/pojo/taobi/Star");
const STAR = [
	"天蓬星",
	"天芮星",
	"天冲星",
	"天辅星",
	"天禽星",
	"天心星",
	"天柱星",
	"天任星",
	"天英星",
];
const STAR_PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
describe("奇门-九星", () => {
	for (let i = 0; i <= 8; i++) {
		const star = new Star(i);
		it(`${STAR[i]},${STAR_PHASES[i]}`, () => {
			expect(star.getIndex()).toBe(i);
			expect(star.getPhases(true)).toBe(STAR_PHASES[i]);
		});
	}
});
