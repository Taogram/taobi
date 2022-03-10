/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-26 09:50:06
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 20:26:45
 */
const handler = {
	// 获取倒数X位数
	rightFigure(num, index = 1) {
		const _num = num + "";
		return ~~_num.slice(_num.length - index);
	},
	/**
	 * 数组截取
	 * @param {Array} list 原数组
	 * @param {Number} index 截断点
	 * @returns {Array} lists 截取的数组集合
	 */
	arraySplit(list, index) {
		return [list.slice(0, index), list.slice(index)];
	},
	/**
	 * 数组交换,正数左右，负数右左交换
	 * @param {Array} list 原数组
	 * @param {Number} index 截断点
	 * @returns {Array} arr 交换后的数组
	 */
	arraySwap(list, index) {
		if (index < 0) index = list.length + index;
		const result = this.arraySplit(list, index);
		return result[1].concat(result[0]);
	},
	/**
	 * 数组左右交换
	 * @param {Array} list 原数组
	 * @param {Number} index 截断点
	 * @returns {Array} arr 交换后的数组
	 */
	arrayUp(list, index) {
		return this.arraySwap(list, index);
	},
	/**
	 * 数组右左交换
	 * @param {Array} list 原数组
	 * @param {Number} index 截断点
	 * @returns {Array} arr 交换后的数组
	 */
	arrayDown(list, index) {
		return this.arraySwap(list, -index);
	},
};
module.exports = handler;
