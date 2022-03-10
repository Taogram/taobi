/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-22 09:46:44
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 22:16:29
 * @FilePath: \taobi\src\template\tao.js
 */

const { Paragraph, TextRun, HeadingLevel } = require("docx");

module.exports = ({ title, table }) => {
	return {
		children: [
			new Paragraph({
				children: [
					new TextRun({
						text: title,
						bold: true,
					}),
				],
				heading: HeadingLevel.TITLE,
			}),
			table,
		],
	};
};
