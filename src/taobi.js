/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 13:58:10
 * @LastEditors: lax
 * @LastEditTime: 2022-03-13 20:19:24
 * @FilePath: \taobi\src\taobi.js
 */
const TheArtOfBecomingInvisible = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const WORD = require("@/tools/word/index.js");
const TEMP = require("@/template/tao.js");
class TheArtOfBecomingInvisibleTools extends TheArtOfBecomingInvisible {
	word() {
		const word = WORD.generateWord(TEMP, this.getArray());
		WORD.saveWord(null, word);
	}
}

module.exports = TheArtOfBecomingInvisibleTools;
const taobi = new TheArtOfBecomingInvisibleTools("壬寅壬寅辛亥丙申", 1);
taobi.word();
