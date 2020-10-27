/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 14:37:53
 * @LastEditors: lax
 * @LastEditTime: 2020-10-27 15:00:55
 */
const Calendar = require("./../src/pojo/Calendar.js");

for (let i = 0; i < 12; i++) {
	const calendar = new Calendar(new Date(1999, i, 25));
	console.log(calendar.hstb(true));
}
