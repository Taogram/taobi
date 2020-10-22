/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:27:42
 * @LastEditors: lax
 * @LastEditTime: 2020-10-22 15:33:14
 */
class TianGan {
	constructor(p = {}) {
		this.index = p.index || 0;
	}
}
TianGan.prototype.list = [
	"甲",
	"乙",
	"丙",
	"丁",
	"戊",
	"己",
	"庚",
	"辛",
	"壬",
	"癸"
];
module.exports = TianGan;
