/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-02-27 22:33:35
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 22:29:54
 * @FilePath: \taobi\test\cache.js
 */

const Tao = require("@/pojo/taobi/TheArtOfBecomingInvisible.js");
const now = "壬寅壬寅辛亥丙申";
const tao = new Tao(now, 1);
const canvas = tao.getCanvas();

console.log(canvas);
