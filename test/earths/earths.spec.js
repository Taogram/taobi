/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-12-11 00:57:08
 * @LastEditors: lax
 * @LastEditTime: 2023-04-29 07:56:25
 * @FilePath: \taobi\test\tao.spec.js
 */
const surpriseCeremony = require("./surpriseCeremony");
const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const now = "壬寅壬寅辛亥丙申";
describe("奇门摆盘-第三步:地盘布三奇六仪", () => {
	for (let i = -9; i <= 9; i++) {
		if (i) {
			const tao = new Tao(now, i);
			const name = `${i < 0 ? "_" : ""}list${Math.abs(i)}`;
			const round = surpriseCeremony[name];
			it(`用局:${i > 0 ? "阳" : "阴"}${Math.abs(i)},结果:${round}`, () => {
				tao.acquired.map((palace, index) => {
					expect(palace.getECS(true)[0]).toBe(round[index]);
				});
			});
		}
	}
});
