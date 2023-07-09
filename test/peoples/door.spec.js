/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2023-07-09 19:03:33
 * @LastEditors: lax
 * @LastEditTime: 2023-07-09 19:25:41
 */
const Door = require("@/pojo/taobi/Door");
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
const DOOR_PHASES = ["水", "土", "木", "木", "", "金", "金", "土", "火"];
describe("奇门-八门", () => {
	for (let i = 0; i <= 8; i++) {
		if (i !== 4) {
			const door = new Door(i);
			it(`${DOOR[i]},${DOOR_PHASES[i]}`, () => {
				expect(door.getIndex()).toBe(i);
				expect(door.getPhases(true)).toBe(DOOR_PHASES[i]);
			});
		}
	}
});
