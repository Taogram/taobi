/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-13 13:58:10
 * @LastEditors: lax
 * @LastEditTime: 2022-03-15 21:36:25
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
const taobi = new TheArtOfBecomingInvisibleTools("乙亥壬午癸酉丁巳");
taobi.word();
