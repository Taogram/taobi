/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2021-02-10 22:37:42
 * @FilePath: \taobi\test\hstb.js
 */
const HSTB = require("../src/pojo/hstb/HeavenlyStemsAndTerrestrialBranch.js");
const {
	heavenlyStems,
	terrestrialBranch,
	heavenlyStemsAndTerrestrialBranch,
} = require("../src/pojo/Tao");

describe("天干地支对象：HeavenlyStemsAndTerrestrialBranch", () => {
	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		it(`仅传一个参数,参数值为：${i}/对应值应为：${name}`, () => {
			expect(new HSTB(i).hstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		it(`仅传一个参数,参数值为：${name}/对应值应为：${name}`, () => {
			expect(new HSTB(name).hstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const hs = heavenlyStems[i];
			const tb = terrestrialBranch[j];
			it(`传两个参数,参数值为：${hs}和${tb}/对应值应为：${hs + tb}`, () => {
				expect(new HSTB(i, j).hstb(true)).toBe(hs + tb);
			});
		}
	}
});
