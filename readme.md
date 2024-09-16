<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-19 16:45:51
 * @LastEditors: lax
 * @LastEditTime: 2024-09-16 12:16:30
 * @FilePath: \taobi\readme.md
-->
# 在线奇门
基于js的在线奇门摆盘库，二十四节气采用天文VSOP87D算法，可精确至分钟
支持自定义拆补法、茅山法、均分法（原创）
2024持续更新中
[查看全部项目](https://github.com/Taogram/taogram)
<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 简介
旨在打造一个灵活可自定义且规范的奇门摆盘程序
目前支持：
### 二十四节气计算
* 自定义章动算法：IAU1980/IAU2000B
* 自定义力学时算法 NASA
### 干支计算
* 自定义起始甲子日（待更新）
### 奇门摆盘
* 自定义摆盘：转盘、飞盘(待更新)
* 自定义用局：拆补法、置润法（不支持，也不推荐）、茅山法、均分法（原创）
* 自定义寄宫：寄坤、寄坤艮，寄四维等
### 摆盘
* step1：转化时间 ✔
* step2：获取用局 ✔
* step3：布三奇六仪 ✔
* step4：得值使/值符 ✔
* step5：布九星 ✔
* step6：布八门 ✔
* step7：布八神 ✔
### 解盘(扩展包)(TODO)
* 标记空亡
* 标记马星
* 对冲
* 旺相休囚废（死）
* 落宫
### 辅助功能(TODO)
* 输出文档
* 支持前端框架
<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 算法说明
### 公历转干支历
参考了古时干支历的断法，安公转断年月/自转断日时，以公转转儒略日再计算实际的干支历
公转采用了天文算法的vsop87D，默认以简化库的算法计算，以便加快生成速度，误差在秒级
误差经过章动、光行差等修正，以及考虑世界时和力学时的间隔
### 章动
地球章动默认采用了IAU1980的算法，可以选择IAU2000
### 世界时与力学时差
默认采用了NASA的计算方法，存在一定的误差，非百年时间可忽略不计

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 用局
用局安地球公转断二十四节气，考虑按天或小时两种维度计算，也可以作为自定义参数指定
### 均分法（原创）（✔）
借助天文计算，根据每一节气的实际时长均分3份，分别对应上元中元下元。即按照实际节气的三分之判断是哪一元，不再根据5天一元的规律进行起局。
依据：二十四节气按地球公转均分二十四等分为节气，而公转为一椭圆。则每一节气必然不均等，而节气决定了用局，则实际指代用局之力量来自于太阳，因此每一节气三元也应该严格按照均分进行划分，这就对应了每一个时辰的实际作用力。
### 拆补法（✔）

### 茅山法（✔）
### 置润法（TODO）

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 摆盘法
目前仅支持时家转盘奇门

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 讨论组
暂无，可以在github上

# 文档

## 引入

### node.js
```
const { TheArtOfBecomingInvisible } = require("taobi");
```

## 快速使用

### 起局
```
const { TheArtOfBecomingInvisible } = require("taobi");
const taobi = new TheArtOfBecomingInvisible(new Date());
const data = taobi.getCanvas();
```
#### 指定时间
```
// 公历
const taobi = new TheArtOfBecomingInvisible(new Date());
// 干支历
const taobi = new TheArtOfBecomingInvisible("癸卯甲子甲子甲子",9);
```
PS:若用干支历起局，必须手动指定用局。
#### 转盘/飞盘（未完成）
```
// 默认为转盘
const taobi = new TheArtOfBecomingInvisible(new Date(),null,1 or 2);
```
#### 寄宫
```
// 默认为二盘
const taobi = new TheArtOfBecomingInvisible(new Date(),null,null,0);
// 寄二八宫
const taobi = new TheArtOfBecomingInvisible(new Date(),null,null,1);
// 寄四维宫/四季宫(未完成)
```
#### 用局
```
//指定用局：阳局[1~9] / 阴局[-1~-9]
const taobi = new TheArtOfBecomingInvisible(new Date(),1);
```
```
//指定三元 [0-2]上中下元
const taobi = new TheArtOfBecomingInvisible(new Date(),null,null,null,{element:1});
```
```
//指定用局法 [0-3]均分法/拆补法/茅山法/置闰法（未完成）
const taobi = new TheArtOfBecomingInvisible(new Date(),null,null,null,{elements:1});
```
#### VSOP87(TODO)
#### 干支历起点(TODO)
#### 力学时差公式(TODO)

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 对象
### 干支 SexagenaryCycle
#### 属性
* x  天干序号
* y  地支序号
* index 干支序号

#### 方法
* cs(is) 返回天干序号或字符

### 干支历 Calendar
### 宫 Palace
### 奇门 TheArtOfBecomingInvisible
#### 方法


## [标准词汇表](https://github.com/Taogram/tao_name)
