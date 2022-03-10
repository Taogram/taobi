/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-05 22:00:52
 * @LastEditors: lax
 * @LastEditTime: 2022-03-05 22:09:30
 * @FilePath: \taobi\src\config\index.js
 */
const fs = require("fs-extra");
const path = require("path");
fs.ensureFile(path.resolve(__dirname, "./../../tao.config.js"));
const config = require("@root/tao.config.js");
const CONFIG = Object.assign({}, config);

module.exports = CONFIG;
