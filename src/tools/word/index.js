/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-01 09:28:23
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 21:57:27
 * @FilePath: \taobi\src\tools\word\index.js
 */
const {
	Document,
	Packer,
	Paragraph,
	TextRun,
	HeadingLevel,
	ImageRun,
	PageOrientation,
} = require("docx");
const fs = require("fs-extra");
const moment = require("moment");

const { wordName } = require("@/config/index.js").output;
const { getRoot } = require("@/tools/path/index.js");

function generateWord(callback) {
	const pro = callback({
		Document,
		HeadingLevel,
		PageOrientation,
		Paragraph,
		TextRun,
		ImageRun,
	});
	return new Document(pro);
}

function saveWord(p, docx, date = new Date()) {
	p = p || "";

	return new Promise((resolve) => {
		const usePath = getRoot(p);
		fs.ensureDirSync(usePath);

		Packer.toBuffer(docx).then((buffer) => {
			fs.writeFileSync(
				`${usePath}/${moment(date).format("YYYY-MM-DD")}-${wordName}.docx`,
				buffer
			);
			resolve(buffer);
		});
	});
}

module.exports = {
	generateWord,
	saveWord,
};
