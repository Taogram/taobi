/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2023-07-15 22:49:19
 */
// const Palace = require("@/pojo/taobi/Palace");
const TaoConvert = require("@/pojo/taobi/TaoConvert");
const tao = new TaoConvert();
describe("奇门-九宫", () => {
	const PHASES = ["水", "土", "木", "木", "土", "金", "金", "土", "火"];
	const CS = ["壬,癸", "", "甲,乙", "", "戊,己", "", "庚,辛", "", "丙,丁"];
	const TB = ["子", "未,申", "卯", "辰,巳", "", "戌,亥", "酉", "丑,寅", "午"];
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
	const DOOR = [
		"休门",
		"死门",
		"伤门",
		"杜门",
		"",
		"开门",
		"惊门",
		"生门",
		"景门",
	];
	for (let i = 0; i < 9; i++) {
		const phase = PHASES[i];
		const cs = CS[i];
		const tb = TB[i];
		const star = STAR[i];
		const door = DOOR[i];
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
