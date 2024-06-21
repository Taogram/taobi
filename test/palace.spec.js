/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:58:57
 */
const { STAR_ARR, DOOR_ARR } = require("tao_name");
const TaoConvert = require("@/pojo/taobi/TaoConvert");
const tao = new TaoConvert();
describe("奇门-九宫", () => {
	const PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
	const CS = ["壬,癸", "", "甲,乙", "", "戊,己", "", "庚,辛", "", "丙,丁"];
	const TB = ["子", "未,申", "卯", "辰,巳", "", "戌,亥", "酉", "丑,寅", "午"];
	for (let i = 0; i < 9; i++) {
		const phase = PHASES[i];
		const cs = CS[i];
		const tb = TB[i];
		const star = STAR_ARR[i];
		const door = DOOR_ARR[i];
		const palace = tao.acquired[i];
		describe(`${palace.getPalace(true)}宫`, () => {
			it(`${palace.getPalace(true)}宫,序列${i + 1}`, () => {
				expect(palace.getPalace()).toBe(i);
			});
			it(`五行：${phase}`, () => {
				expect(palace.getPhases(true)).toBe(phase);
			});
			it(`天干：${cs}`, () => {
				expect(palace.getOCS(true).toString()).toBe(cs);
			});
			it(`地支：${tb}`, () => {
				expect(palace.getOTB(true).toString()).toBe(tb);
			});
			it(`九星：${star}`, () => {
				expect(palace.getOStar(true).toString()).toBe(star);
			});
			it(`八门：${door}`, () => {
				expect(palace.getODoor(true).toString()).toBe(door);
			});
		});
	}
});
