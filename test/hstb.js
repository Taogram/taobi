/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2020-12-12 23:29:29
 * @FilePath: \taobi\test\hstb.js
 */
const HSTB = require("./../src/pojo/hstb/HeavenlyStemsAndTerrestrialBranch.js");
const Calendar = require("./../src/pojo/hstb/Calendar.js");

let result = "";
for (let i = 1; i <= 60; i++) {
	const hstb = new HSTB(i);
	result =
		result +
		"[" +
		[hstb.hstb(), hstb.hstb(true), hstb.getLead().hstb(true)] +
		"]/";
	if (i % 10 == 0) {
		console.log(result);
		result = "";
	}
}
for (let i = 1; i <= 10; i++) {
	for (let j = 0; j <= 23; j++) {
		console.log("#######################");
		console.log("日干支:" + Calendar.getByDay(2020, 12, i).hstb(true));
		console.log(
			i + "/" + j + ":" + Calendar.getByHour(2020, 12, i, j).hstb(true)
		);
	}
}

for (let i = 3; i <= 14; i++) {
	let m = (30 * (Math.pow(-1, i) + 1)) / 2 + Math.floor((3 * i - 7) / 5);
	console.log(m);
}
