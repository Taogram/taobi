const TaoConvert = require("@/pojo/taobi/TaoConvert");
const tao = new TaoConvert();
const { priori, acquired } = require("@/pojo/Tao.js");

describe("init", () => {
	it("九宫:generatePalace", () => {
		const { one, two, three, four, five, six, seven, eight, nine } = tao;
		expect(one.getPalace(true)).toBe(acquired[0]);
		expect(two.getPalace(true)).toBe(acquired[1]);
		expect(three.getPalace(true)).toBe(acquired[2]);
		expect(four.getPalace(true)).toBe(acquired[3]);
		expect(five.getPalace(true)).toBe(acquired[4]);
		expect(six.getPalace(true)).toBe(acquired[5]);
		expect(seven.getPalace(true)).toBe(acquired[6]);
		expect(eight.getPalace(true)).toBe(acquired[7]);
		expect(nine.getPalace(true)).toBe(acquired[8]);
	});

	// 乾一兑二离三震四巽五坎六艮七坤八
	it("先天卦序:generatePrioriPalace", () => {
		tao.priori.map((p, i) => {
			expect(p.getPalace(false, true)).toBe(i);
			expect(p.getPalace(true)).toBe(priori[i]);
		});
	});

	// 坎一坤二震三巽四中五乾六兑七艮八离九
	it("后天卦序:generateAcquiredPalace", () => {
		tao.acquired.map((p, i) => {
			expect(p.getPalace(false, false)).toBe(i);
			expect(p.getPalace(true)).toBe(acquired[i]);
		});
	});

	// 巽 离 坤
	// 震 中 兑
	// 艮 坎 乾
	it("九宫box:generateNinePalace", () => {
		const x = tao.box;
		expect(x[0][0].getPalace(true)).toBe(acquired[3]);
		expect(x[0][1].getPalace(true)).toBe(acquired[8]);
		expect(x[0][2].getPalace(true)).toBe(acquired[1]);
		expect(x[1][0].getPalace(true)).toBe(acquired[2]);
		expect(x[1][1].getPalace(true)).toBe(acquired[4]);
		expect(x[1][2].getPalace(true)).toBe(acquired[6]);
		expect(x[2][0].getPalace(true)).toBe(acquired[7]);
		expect(x[2][1].getPalace(true)).toBe(acquired[0]);
		expect(x[2][2].getPalace(true)).toBe(acquired[5]);
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
