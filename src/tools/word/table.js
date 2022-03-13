/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-28 12:37:49
 * @LastEditors: lax
 * @LastEditTime: 2022-03-13 16:20:49
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
	HeightRule,
} = require("docx");
const { borders } = require("@/tools/word/properties.js");
const CELL_SIZE = 1000;
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
				const opt = Object.assign({}, option, diy);

				return new TableCell(opt);
			});
			return new TableRow({
				children: cols,
				height: {
					value: CELL_SIZE,
					rule: HeightRule.EXACT,
				},
			});
		});
		return new Table({
			rows,
			width: {
				size: CELL_SIZE * 9,
				type: WidthType.DXA,
			},
			alignment: AlignmentType.CENTER,
		});
	},
};
