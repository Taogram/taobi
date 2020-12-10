/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: lax
 * @Date: 2020-10-27 14:37:53
 * @LastEditors: lax
 * @LastEditTime: 2020-10-29 17:18:29
 */
/* eslint-disable */
const Calendar = require("../src/pojo/hstb/Calendar.js");
const Taobi = require("../src/pojo/taobi/TheArtOfBecomingInvisible");
const HSTB = require("./../src/pojo/hstb/HeavenlyStemsAndTerrestrialBranch");

const Earth = require("./../src/pojo/taobi/Earth")
const Heaven = require("./../src/pojo/taobi/Heaven")
// const consola = require("consola");

for (let i = 0; i < 12; i++) {
	// const calendar = new Calendar(new Date(1999, i, 25));
	// console.log(calendar.hstb(true));
}

for (let i = -9; i < 10; i++) {
	if (i != 0) {
		// const taobi = new Taobi(i);
		// console.log((i < 0 ? "阴" : "阳") + "遁" + Math.abs(i) + "局：");
		// console.log(taobi.toRound());
	}
}

for (let i = -9; i < 10; i++) {
	if (i != 0) {
		// const taobi = new Taobi(i);
		// console.log((i < 0 ? "阴" : "阳") + "遁" + Math.abs(i) + "局：");
		// console.log(taobi.toStar());
	}
}
// const taobi = new Taobi(3,new Calendar([["乙", "亥"],["壬", "午"],["癸", "酉"],["丁", "巳"]])
// );
// console.log(taobi.ont);

const earth = new Earth(1);
console.log(earth.toRound())

const heaven = new Heaven(earth,new HSTB("戊","戌"))
console.log(heaven.toName())
console.log(heaven.toRound())

