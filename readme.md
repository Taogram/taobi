<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-19 16:45:51
 * @LastEditors: lax
 * @LastEditTime: 2024-07-21 23:07:21
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
* 自定义力学时算法
### 干支计算
* 自定义起始甲子日
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


# 标准词汇表

## 八卦 Trigrams
## 天干 Celestial Stems
甲：METH  
乙：ETH  
丙：PROP  
丁：BUT  
戊：PENT  
己：HEX  
庚：HEPT  
辛：OCT  
壬：NON  
癸：DEC  

## 地支 Terrestrial Branches
子：JAN  
丑：FEB  
寅：MAR  
卯：APR  
辰：MAY  
巳：JUN  
午：JUL  
未：AUG  
申：SEPT  
酉：OCT  
戌：NOV  
亥：DEC  

## 干支表 Sexagenary Cycle
甲子：MATH_JAN  
乙丑：ETH_FEB  
丙寅：PROP_MAR  
丁卯：BUT_APR  
戊辰：PENT_MAY  
己巳：HEX_JUN  
庚午：HEPT_JUL  
辛未：OCT_AUG  
壬申：NON_SEPT  
癸酉：DEC_OCT  
甲戌：MATH_NOV  
乙亥：ETH_DEC  
丙子：PROP_JAN  
丁丑：BUT_FEB  
戊寅：PENT_MAR  
己卯：HEX_APR  
庚辰：HEPT_MAY  
辛巳：OCT_JUN  
壬午：NON_JUL  
癸未：DEC_AUG  
甲申：METH_SEPT  
乙酉：ETH_OCT  
丙戌：PROP_NOV  
丁亥：BUT_DEC  
戊子：PENT_JAN  
己丑：HEX_FEB  
庚寅：HEPT_MAR  
辛卯：OCT_APR  
壬辰：NON_MAY  
癸巳：DEC_JUN  
甲午：METH_JUL  
乙未：ETH_AUG  
丙申：PROP_SEPT  
丁酉：BUT_OCT  
戊戌：PENT_NOV  
己亥：HEX_DEC  
庚子：HEPT_JAN  
辛丑：OCT_FEB  
壬寅：NON_MAR  
癸卯：DEC_APR  
甲辰：METH_MAY  
乙巳：ETH_JUN  
丙午：PROP_JUL  
丁未：BUT_AUG  
戊申：PENT_SEPT  
己酉：HEX_OCT  
庚戌：HEPT_NOV  
辛亥：OCT_DEC  
壬子：NON_JAN  
癸丑：DEC_FEB  
甲寅：METH_MAR  
乙卯：ETH_APR  
丙辰：PROP_MAY  
丁巳：BUT_JUN  
戊午：PENT_JUL  
己未：HEX_AUG  
庚申：HEPT_SEPT  
辛酉：OCT_OCT  
壬戌：NON_NOV  
癸亥：DEC_DEC  

## 六仪 Ceremony
戊：PENT  
己：HEX  
庚：HEPT  
辛：OCT  
壬：NON  
癸：DEC  

## 三奇 Surprise
丁：BUT  
丙：PROP  
乙：ETH  

## 后天八卦 Acquired
坎：KAN  
坤：EARTH  
震：SHAKE  
巽：XUN  
中：MID  
乾：HEAVEN  
兑：DUI  
艮：GEN  
离：LEAVE  

## 地盘 Earths

## 天盘 Heavens

## 人盘 Peoples
