/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-02-11 12:08:22
 * @LastEditors: lax
 * @LastEditTime: 2021-02-11 12:11:45
 * @FilePath: \taobi\test\calendar.spec.js
 */
const Calendar = require("../src/pojo/hstb/Calendar");

describe("干支历对象：Calendar", () => {
	const result = ["庚子"];
	for (let i = 0; i < 60; i++) {
		it(`函数getByHour：${i}/对应值应为：${name}`, () => {
			expect(Calendar.getByYear(i)).toBe(name);
		});
	}
});
