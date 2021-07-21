/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2021-07-21 22:52:11
 * @FilePath: \taobi\test\hstb.spec.js
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
		const arr = Array.from(name);
		const h = heavenlyStems.indexOf(arr[0]);
		const t = terrestrialBranch.indexOf(arr[1]);
		const obj = {
			x: h,
			y: t,
		};
		it(`arg:1,type:object,value：{${obj.x},${obj.y}}=>result：${name}`, () => {
			expect(new HSTB(obj).hstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		const arr = Array.from(name);
		const obj = {
			x: arr[0],
			y: arr[1],
		};
		it(`arg:1,type:object,value：{${obj.x},${obj.y}}=>result：${name}`, () => {
			expect(new HSTB(obj).hstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		const arr = Array.from(name);
		const h = heavenlyStems.indexOf(arr[0]);
		const t = terrestrialBranch.indexOf(arr[1]);
		const list = [h, t];
		it(`arg:1,type:array,value：[${list[0]},${list[1]}]=>result：${name}`, () => {
			expect(new HSTB(list).hstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		const arr = Array.from(name);
		it(`arg:1,type:object,value：[${arr[0]},${arr[1]}]=>result：${name}`, () => {
			expect(new HSTB(arr).hstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		it(`arg:1,type:number,value：${i}=>result：${name}`, () => {
			expect(new HSTB(i).hstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		it(`arg:1,type:string,value："${i}"=>result：${name}`, () => {
			expect(new HSTB(`${i}`).hstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 60; i++) {
		const name = heavenlyStemsAndTerrestrialBranch[i];
		it(`arg:1,type:string,value：${name}=>result：${name}`, () => {
			expect(new HSTB(name).hstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const hs = heavenlyStems[i];
			const tb = terrestrialBranch[j];
			it(`arg:2,type:string,value：${hs}/${tb}=>result：${hs + tb}`, () => {
				expect(new HSTB(hs, tb).hstb(true)).toBe(hs + tb);
			});
		}
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const hs = heavenlyStems[i];
			const tb = terrestrialBranch[j];
			it(`arg:2,type:number,value：${i}/${j}=>result：${hs + tb}`, () => {
				expect(new HSTB(i, j).hstb(true)).toBe(hs + tb);
			});
		}
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const hs = heavenlyStems[i];
			const tb = terrestrialBranch[j];
			it(`arg:2,type:string,value："${i}"/"${j}"=>result：${hs + tb}`, () => {
				expect(new HSTB(`${i}`, `${j}`).hstb(true)).toBe(hs + tb);
			});
		}
	}
});
