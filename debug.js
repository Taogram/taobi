/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-02-10 20:20:15
 * @LastEditors: lax
 * @LastEditTime: 2022-03-15 21:05:19
 * @FilePath: \taobi\debug.js
 */
console.log(~~"乙");
for (let i = 0; i <= 59; i++) {
	console.log(i % 10);
}
const str = "甲乙";
console.log(str[0]);
console.log(str[1]);

console.log([] instanceof Array);
console.log(typeof "11");
console.log(typeof new Date());
const date = new Date();
console.log(date instanceof Date);

const a = 12;
console.log(`0${a}`.indexOf("-"));
