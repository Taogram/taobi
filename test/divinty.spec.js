/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:43:01
 */
const Divinity = require("@/pojo/taobi/Divinity");
const { DIVINITY_ARR } = require("tao_name");
const DIVINITY_PHASES = ["土", "火", "金", "木", "金", "水", "土", "金"];
describe("奇门-八神", () => {
	for (let i = 0; i <= 7; i++) {
		const divinity = new Divinity(i);
		it(`${DIVINITY_ARR[i]},${DIVINITY_PHASES[i]}`, () => {
			expect(divinity.getIndex()).toBe(i);
			expect(divinity.getPhases(true)).toBe(DIVINITY_PHASES[i]);
		});
	}
});
