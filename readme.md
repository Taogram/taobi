<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2022-03-19 16:45:51
 * @LastEditors: lax
 * @LastEditTime: 2024-02-09 12:30:16
 * @FilePath: \taobi\readme.md
-->
# 在线奇门
基于js的在线奇门摆盘库，干支历采用天文VSOP87D算法
2024持续更新中

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

# 简介
旨在打造一个灵活可自定义且规范的奇门摆盘程序
目前支持：
* 二十四节气计算
    * 自定义章动算法：IAU1980/IAU2000B
    * 自定义力学时算法
* 干支计算
    * 自定义起始甲子日
* 奇门摆盘
    * 自定义摆盘：转盘、飞盘
    * 自定义用局：拆补法、置润法、茅山法、均分法（原创）
    * 自定义寄宫：寄坤、寄坤艮，寄四维等

## 算法
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
用局安自转断二十四节气，考虑按天或小时两种精度计算，也可以作为自定义参数自定义指定
### 均分法（✔）
### 拆补法（✔）
### 茅山法（TODO）
### 置润法（TODO）

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 摆盘法
目前仅支持时家转盘奇门

<hr style="height:1px;border:none;border-top:1px solid #555555;" />

## 讨论组
暂无，可以在github上


# 功能
## 干支历
* 年干支
* 月干支
* 日干支
* 时干支
## 算法
## 摆盘
* step1：获取用局
* step2：布三奇六仪 ✔
* step3：得值使/值符 ✔
* step4：布九星 ✔
* step5：布八门 ✔
* step6：布八神 ✔
## 解盘
* 标记空亡
* 标记马星
* 对冲
* 旺相休囚废（死）
* 落宫
## 工具
* array
* 文档输出 测试
<hr style="height:1px;border:none;border-top:1px solid #555555;" />

# 文档

## 对象
### 干支 SexagenaryCycle
#### 属性
* x 
天干序号
* y 
干支序号
* index
干支序号

#### 方法
* cs(is)
返回天干序号或字符


### 干支历 Calendar
### 宫 Palace
### 奇门 TheArtOfBecomingInvisible


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
