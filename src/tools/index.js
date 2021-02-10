/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-26 09:50:06
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 10:48:55
 */
const handler = {
	// 获取倒数X位数
	rightFigure(num, index = 1) {
		const _num = num + "";
		return ~~_num.slice(_num.length - index);
	},
	arraySplit(list, index) {
		return [list.slice(0, index), list.slice(index)];
	},
	arrayUp(list, index) {
		const result = this.arraySplit(list, index);
		return result[1].concat(result[0]);
	}
};
module.exports = handler;
