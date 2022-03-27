/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 13:58:10
 * @LastEditors: lax
 * @LastEditTime: 2022-03-27 20:26:57
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
const taobi = new TheArtOfBecomingInvisibleTools("乙亥戊寅辛巳癸巳", 9);
taobi.word();
