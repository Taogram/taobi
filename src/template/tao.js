/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2021-07-22 09:46:44
 * @LastEditors: lax
 * @LastEditTime: 2022-03-14 22:49:08
 * @FilePath: \taobi\src\template\tao.js
 */

const {
	Paragraph,
	TextRun,
	HeadingLevel,
	VerticalAlign,
	WidthType,
	AlignmentType,
	TableCell,
	TableRow,
	HeightRule,
	Table,
	BorderStyle,
} = require("docx");
const TITLE = "奇门遁甲求测图";
// const Table = require("@/tools/word/table.js");
const CELL_SIZE = 1000;

function palaceBorders(x, y) {
	let color = "000000";
	let size = 1;
	let style = BorderStyle.NONE;

	let top = { style, size, color };
	let left = { style, size, color };
	let right = { style, size, color };
	let bottom = { style, size, color };
	if (x === 0 || x === 3 || x === 6) {
		top.style = BorderStyle.SINGLE;
	}
	if (x === 2 || x === 5 || x === 8) {
		bottom.style = BorderStyle.SINGLE;
	}
	if (y === 0 || y === 3 || y === 6) {
		left.style = BorderStyle.SINGLE;
	}
	if (y === 2 || y === 5 || y === 8) {
		right.style = BorderStyle.SINGLE;
	}

	return { top, bottom, left, right };
}

function generateTable(palace) {
	const rows = palace.map((row, x) => {
		if (!row.length) return null;
		const cols = row.map((col, y) => {
			const option = {
				borders: palaceBorders(x, y),
				children: [
					new Paragraph({
						children: [
							new TextRun({
								text: col + "",
								font: "楷体",
							}),
						],
						alignment: AlignmentType.CENTER,
					}),
				],
				width: {
					size: CELL_SIZE,
					type: WidthType.DXA,
				},
				verticalAlign: VerticalAlign.CENTER,
			};
			const opt = Object.assign({}, option);

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
}

module.exports = (taobi) => {
	return {
		sections: [
			{
				children: [
					new Paragraph({
						children: [
							new TextRun({
								text: TITLE,
								bold: true,
							}),
						],
						alignment: AlignmentType.CENTER,
						heading: HeadingLevel.TITLE,
					}),
					generateTable(taobi),
					new Paragraph({
						children: [
							new TextRun({
								text: "公历",
								bold: true,
							}),
						],
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: "干支历",
								bold: true,
							}),
						],
					}),
				],
			},
		],
	};
};
