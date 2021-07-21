/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2021-07-21 23:04:40
 * @FilePath: \taobi\test\hstb.spec.js
 */
const CSTB = require("../src/pojo/cstb/SexagenaryCycle");
const {
	celestialStems,
	terrestrialBranches,
	sexagenaryCycle,
} = require("../src/pojo/Tao");

describe("天干地支对象：sexagenaryCycle", () => {
	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		const arr = Array.from(name);
		const h = celestialStems.indexOf(arr[0]);
		const t = terrestrialBranches.indexOf(arr[1]);
		const obj = {
			x: h,
			y: t,
		};
		it(`arg:1,type:object,value：{${obj.x},${obj.y}}=>result：${name}`, () => {
			expect(new CSTB(obj).cstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		const arr = Array.from(name);
		const obj = {
			x: arr[0],
			y: arr[1],
		};
		it(`arg:1,type:object,value：{${obj.x},${obj.y}}=>result：${name}`, () => {
			expect(new CSTB(obj).cstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		const arr = Array.from(name);
		const h = celestialStems.indexOf(arr[0]);
		const t = terrestrialBranches.indexOf(arr[1]);
		const list = [h, t];
		it(`arg:1,type:array,value：[${list[0]},${list[1]}]=>result：${name}`, () => {
			expect(new CSTB(list).cstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		const arr = Array.from(name);
		it(`arg:1,type:object,value：[${arr[0]},${arr[1]}]=>result：${name}`, () => {
			expect(new CSTB(arr).cstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		it(`arg:1,type:number,value：${i}=>result：${name}`, () => {
			expect(new CSTB(i).cstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		it(`arg:1,type:string,value："${i}"=>result：${name}`, () => {
			expect(new CSTB(`${i}`).cstb(true)).toBe(name);
		});
	}
	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		it(`arg:1,type:string,value：${name}=>result：${name}`, () => {
			expect(new CSTB(name).cstb(true)).toBe(name);
		});
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const cs = celestialStems[i];
			const tb = terrestrialBranches[j];
			it(`arg:2,type:string,value：${cs}/${tb}=>result：${cs + tb}`, () => {
				expect(new CSTB(cs, tb).cstb(true)).toBe(cs + tb);
			});
		}
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const cs = celestialStems[i];
			const tb = terrestrialBranches[j];
			it(`arg:2,type:number,value：${i}/${j}=>result：${cs + tb}`, () => {
				expect(new CSTB(i, j).cstb(true)).toBe(cs + tb);
			});
		}
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const cs = celestialStems[i];
			const tb = terrestrialBranches[j];
			it(`arg:2,type:string,value："${i}"/"${j}"=>result：${cs + tb}`, () => {
				expect(new CSTB(`${i}`, `${j}`).cstb(true)).toBe(cs + tb);
			});
		}
	}
});
