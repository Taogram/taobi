/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-15 22:26:04
 * @LastEditors: lax
 * @LastEditTime: 2020-12-15 22:34:19
 * @FilePath: \taobi\test\taobi\Heaven.js
 */
const Earth = require("./../../src/pojo/taobi/Earth");
const Heaven = require("./../../src/pojo/taobi/Heaven");
const Calendar = require("./../../src/pojo/hstb/Calendar");

for (let i = -9; i <= 9; i++) {
	if (i != 0) {
		const heaven = new Heaven(
			new Earth(i),
			Calendar.getByHour(2020, 12, 15, 12)
		);
		console.log("用局:" + i);
		console.log(heaven.toName());
		console.log(heaven.toRound());
	}
}
