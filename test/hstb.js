/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2020-12-11 01:08:47
 * @FilePath: \taobi\test\hstb.js
 */
const HSTB = require("./../src/pojo/hstb/HeavenlyStemsAndTerrestrialBranch.js");

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
