/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2024-02-03 22:26:53
 * @LastEditors: lax
 * @LastEditTime: 2024-05-19 10:41:27
 */
const TaoConvert = require("@/pojo/taobi/TaoConvert");
const tao = new TaoConvert();
const { APRIORI_ARR, ACQUIRED, ACQUIRED_ARR } = require("tao_name");

describe("init", () => {
	it("九宫:generatePalace", () => {
		const { one, two, three, four, five, six, seven, eight, nine } = tao;
		expect(one.getPalace(true)).toBe(ACQUIRED.KAN);
		expect(two.getPalace(true)).toBe(ACQUIRED.KUN);
		expect(three.getPalace(true)).toBe(ACQUIRED.ZHEN);
		expect(four.getPalace(true)).toBe(ACQUIRED.XUN);
		expect(five.getPalace(true)).toBe(ACQUIRED.ZHONG);
		expect(six.getPalace(true)).toBe(ACQUIRED.QIAN);
		expect(seven.getPalace(true)).toBe(ACQUIRED.DUI);
		expect(eight.getPalace(true)).toBe(ACQUIRED.GEN);
		expect(nine.getPalace(true)).toBe(ACQUIRED.LI);
	});

	// 乾一兑二离三震四巽五坎六艮七坤八
	it("先天卦序:generatePrioriPalace", () => {
		tao.priori.map((p, i) => {
			expect(p.getPalace(false, true)).toBe(i);
			expect(p.getPalace(true)).toBe(APRIORI_ARR[i]);
		});
	});

	// 坎一坤二震三巽四中五乾六兑七艮八离九
	it("后天卦序:generateAcquiredPalace", () => {
		tao.acquired.map((p, i) => {
			expect(p.getPalace(false, false)).toBe(i);
			expect(p.getPalace(true)).toBe(ACQUIRED_ARR[i]);
		});
	});

	// 巽 离 坤
	// 震 中 兑
	// 艮 坎 乾
	it("九宫box:generateNinePalace", () => {
		const x = tao.box;
		expect(x[0][0].getPalace(true)).toBe(ACQUIRED.XUN);
		expect(x[0][1].getPalace(true)).toBe(ACQUIRED.LI);
		expect(x[0][2].getPalace(true)).toBe(ACQUIRED.KUN);
		expect(x[1][0].getPalace(true)).toBe(ACQUIRED.ZHEN);
		expect(x[1][1].getPalace(true)).toBe(ACQUIRED.ZHONG);
		expect(x[1][2].getPalace(true)).toBe(ACQUIRED.DUI);
		expect(x[2][0].getPalace(true)).toBe(ACQUIRED.GEN);
		expect(x[2][1].getPalace(true)).toBe(ACQUIRED.KAN);
		expect(x[2][2].getPalace(true)).toBe(ACQUIRED.QIAN);
	});

	// 巽、离、坤、兑、乾、坎、艮、震
	it("环宫:generateCirclePalace", () => {
		const NAME = ["巽", "离", "坤", "兑", "乾", "坎", "艮", "震"];
		tao.circle.map((p, i) => {
			expect(p.rIndex).toBe(i);
			expect(p.getPalace(true)).toBe(NAME[i]);
		});
	});
});
