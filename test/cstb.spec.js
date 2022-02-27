/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2021-10-15 23:38:16
 * @FilePath: \taobi\test\cstb.spec.js
 */
const CSTB = require("@/pojo/cstb/SexagenaryCycle");
const {
	celestialStems,
	terrestrialBranches,
	sexagenaryCycle,
} = require("@/pojo/Tao");

describe("天干地支对象：sexagenaryCycle", () => {
	for (let i = 0; i < 60; i++) {
		const name = sexagenaryCycle[i];
		const head = sexagenaryCycle[~~(i / 10) * 10];
		const arr = Array.from(name);
		const h = celestialStems.indexOf(arr[0]);
		const t = terrestrialBranches.indexOf(arr[1]);
		const obj = {
			x: h,
			y: t,
		};
		const listStr = {
			x: arr[0],
			y: arr[1],
		};
		const listNum = [h, t];

		it(`1参数,类型:object,值:{${obj.x},${obj.y}}=>结果:${name}`, () => {
			expect(new CSTB(obj).cstb(true)).toBe(name);
		});

		it(`1参数,类型:object,值:{${listStr.x},${listStr.y}}=>结果:${name}`, () => {
			expect(new CSTB(listStr).cstb(true)).toBe(name);
		});

		it(`1参数,类型:array,值:[${listNum[0]},${listNum[1]}]=>结果:${name}`, () => {
			expect(new CSTB(listNum).cstb(true)).toBe(name);
		});

		it(`1参数,类型:object,值:[${arr[0]},${arr[1]}]=>结果:${name}`, () => {
			expect(new CSTB(arr).cstb(true)).toBe(name);
		});

		it(`1参数,类型:number,值:${i}=>结果:${name}`, () => {
			expect(new CSTB(i).cstb(true)).toBe(name);
		});

		it(`1参数,类型:string,值:"${i}"=>结果:${name}`, () => {
			expect(new CSTB(`${i}`).cstb(true)).toBe(name);
		});

		it(`1参数,类型:string,值:${name}=>结果:${name}`, () => {
			expect(new CSTB(name).cstb(true)).toBe(name);
		});

		it(`值:${name}=>旬首:${head}`, () => {
			expect(new CSTB(i).getLead(true).cstb(true)).toContain("甲");
		});
	}

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 12; j++) {
			const cs = celestialStems[i];
			const tb = terrestrialBranches[j];
			it(`2参数,类型:string,值:${cs}/${tb}=>结果:${cs + tb}`, () => {
				expect(new CSTB(cs, tb).cstb(true)).toBe(cs + tb);
			});

			it(`2参数,类型:number,值:${i}/${j}=>结果:${cs + tb}`, () => {
				expect(new CSTB(i, j).cstb(true)).toBe(cs + tb);
			});

			it(`2参数,类型:string,值:"${i}"/"${j}"=>结果:${cs + tb}`, () => {
				expect(new CSTB(`${i}`, `${j}`).cstb(true)).toBe(cs + tb);
			});
		}
	}
});
