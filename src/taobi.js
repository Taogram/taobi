/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 13:58:10
 * @LastEditors: lax
 * @LastEditTime: 2022-04-07 22:03:20
 * @FilePath: \taobi\src\taobi.js
 */
const TheArtOfBecomingInvisible = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const WORD = require("@/tools/word/index.js");
const TEMP = require("@/template/tao.js");
class TheArtOfBecomingInvisibleTools extends TheArtOfBecomingInvisible {
	getWordData() {
		return { list: this.getArray(), time: [] };
	}

	word() {
		const word = WORD.generateWord(TEMP, this.getArray());
		WORD.saveWord(null, word);
	}
}

module.exports = TheArtOfBecomingInvisibleTools;
// const taobi = new TheArtOfBecomingInvisibleTools("庚辰甲申丁巳庚子", -4);
// const taobi = new TheArtOfBecomingInvisibleTools("丁丑壬子甲午甲戌", 1);
// const taobi = new TheArtOfBecomingInvisibleTools("乙亥戊寅辛巳癸巳", 9);
// for (let i = -9; i <= 10; i++) {
// 	if (i !== 0) {
// 		for (let j = 1; j <= 8; j++) {
// 			const taobi = new TheArtOfBecomingInvisibleTools(`壬寅甲辰己丑${j}未`, i);
// 			console.log(
// 				taobi.circle.map((each) => {
// 					return each.getStar();
// 				})
// 			);
// 		}
// 	}
// }
const taobi = new TheArtOfBecomingInvisibleTools("壬寅甲辰己丑辛未", 7);
console.log(taobi);
taobi.word();
