/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-28 12:37:49
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 21:58:40
 * @FilePath: \taobi\src\tools\word\table.js
 */
const {
	Paragraph,
	Table,
	TableCell,
	TableRow,
	VerticalAlign,
	AlignmentType,
	WidthType,
} = require("docx");
const { merge } = require("webpack-merge");
const { borders } = require("@/tools/word/properties.js");
module.exports = {
	arrToTable(
		arr,
		callback = () => {
			return {};
		}
	) {
		const rows = arr.map((row, i) => {
			if (!row.length) return null;
			const cols = row.map((col, j) => {
				const diy = callback(col, j);
				const option = {
					borders,
					width: {
						size: 6,
						type: WidthType.PERCENTAGE,
					},
					children: [
						new Paragraph({ text: col + "", alignment: AlignmentType.CENTER }),
					],
					verticalAlign: VerticalAlign.CENTER,
				};
				const opt = merge({}, option, diy);

				return new TableCell(opt);
			});
			return new TableRow({ children: cols });
		});
		return new Table({ rows });
	},
};
