/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-10-15 23:24:59
 * @LastEditors: lax
 * @LastEditTime: 2022-05-29 11:50:08
 * @FilePath: \taobi\src\pojo\algorithm\year.js
 */

module.exports = (year) => {
	// 年份个位数=>天干 补6顺位
	const x = (year + 6) % 10;
	// 年份的12余数=>地支 补8顺位
	const y = (year + 8) % 12;
	return { x, y };
};
