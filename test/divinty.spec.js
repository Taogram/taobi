/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 21:11:04
 */
const Divinity = require("@/pojo/taobi/Divinity");
const DIVINITY = [
	"值符",
	"螣蛇",
	"太阴",
	"六合",
	"白虎",
	"玄武",
	"九地",
	"九天",
];
const DIVINITY_PHASES = ["土", "火", "金", "木", "金", "水", "土", "金"];
describe("奇门-八门", () => {
	for (let i = 0; i <= 7; i++) {
		const divinity = new Divinity(i);
		it(`${DIVINITY[i]},${DIVINITY_PHASES[i]}`, () => {
			expect(divinity.getIndex()).toBe(i);
			expect(divinity.getPhases(true)).toBe(DIVINITY_PHASES[i]);
		});
	}
});
