/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-22 15:33:52
 * @LastEditors: lax
 * @LastEditTime: 2020-10-22 15:35:59
 */
class DiZhi {
	constructor(p = {}) {
		this.index = p.index || 0;
	}
}
DiZhi.prototype.list = [
	"子",
	"丑",
	"寅",
	"卯",
	"辰",
	"巳",
	"午",
	"未",
	"申",
	"酉",
	"戌",
	"亥"
];
module.exports = DiZhi;
