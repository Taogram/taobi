/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-02-27 17:11:41
 * @LastEditors: lax
 * @LastEditTime: 2022-02-27 17:28:43
 * @FilePath: \taobi\test\tools\arr.spec.js
 */
const base = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const upResult = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
];
const downResult = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
];
const Arr = require("@/tools/index.js");

describe("arrayUp", () => {
	for (let i = 0; i < 9; i++) {
		it(`by:${i},结果:${upResult[i]}`, () => {
			Arr.arrayUp(base, i).map((num, index) => {
				expect(num).toBe(upResult[i][index]);
			});
		});
	}
});

describe("arrayDown", () => {
	for (let i = 0; i < 9; i++) {
		it(`by:${i},结果:${downResult[i]}`, () => {
			Arr.arrayDown(base, i).map((num, index) => {
				expect(num).toBe(downResult[i][index]);
			});
		});
	}
});
