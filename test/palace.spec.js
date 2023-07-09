/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 21:09:38
 */
const Palace = require("@/pojo/taobi/Palace");
const ACQUIRED = ["坎", "坤", "震", "巽", "中", "乾", "兑", "艮", "离"];
const ACQUIRED_PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
describe("奇门-九宫", () => {
	for (let i = 0; i <= 8; i++) {
		const palace = new Palace(i);
		it(`${ACQUIRED[i]}宫,${ACQUIRED_PHASES[i]}`, () => {
			expect(palace.getPalace()).toBe(i);
			expect(palace.getPhases(true)).toBe(ACQUIRED_PHASES[i]);
		});
	}
});
