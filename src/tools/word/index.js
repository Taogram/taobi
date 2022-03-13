/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-01 09:28:23
 * @LastEditors: lax
 * @LastEditTime: 2022-03-13 14:32:30
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

const { word } = require("@/config/index.js");
const { docsRoot, name } = word;

function generateWord(callback, taobi) {
	const pro = callback(taobi, {
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
		const usePath = docsRoot;
		fs.ensureDirSync(usePath);

		Packer.toBuffer(docx).then((buffer) => {
			fs.writeFileSync(
				`${usePath}/${moment(date).format("YYYY-MM-DD")}-${name}.docx`,
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
