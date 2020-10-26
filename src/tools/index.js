module.exports = {
	// 获取倒数X位数
	rightFigure(num, index = 1) {
		const _num = num + "";
		return ~~_num.slice(_num.length - index);
	}
};
