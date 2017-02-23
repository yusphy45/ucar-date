## ucar-date
[![Npm Staus](https://img.shields.io/npm/v/ucar-date.svg)](https://www.npmjs.com/package/ucar-date)
[![Build Status](https://travis-ci.org/yusphy45/ucar-date.svg?branch=master)](https://travis-ci.org/yusphy45/ucar-date)
[![Coverage Status](https://coveralls.io/repos/github/yusphy45/ucar-Date/badge.svg?branch=master)](https://coveralls.io/github/yusphy45/ucar-Date?branch=master)
> 神州优车Date工具集合

## Usage
```
import UcarDate from 'ucar-date'
	
let u = new UcarDate(date:String/Number/Date)
```
> ucarDate 可以接受String类型参数 yyyy-MM-dd/yyyy/MM/dd 初始化指定日期

## Property
```
# 传入或默认的时间值:Date
u.value
	
# 时间戳:Number
u.timestamp
	
# 年:Number
u.year
	
# 月:Number
u.month
	
# 月中的第几日:Number
u.date
	
# 周几:Number
u.day
	
# 是否是闰年:Boolean
u.isLeapYear
	
# 是否是较长月份:Boolean
u.isLongMonth
	
# 当月1号周几:Number
u.offsetOfLastMonth

# 当周的周日:Date
u.firstDayOfWeek

# 当月的1号:Date
u.firstDayOfMonth

# 当年的1月1号:Date
u.firstDayOfYear
```
	
## API
```
#获取格式化后的日期字符串:String
u.getDateStr() 默认格式：yyyy-MM-dd

#获取这周所有的日期实例:Array	
u.getAllOfWeek()
	
#获取这个月有多少天:Number
u.getDaysOfMonth()

#获取这个月所有的日期实例:Array
u.getAllOfMonth()
	
#获取这一年应该有多少天:Number
u.getDaysOfYear()

#获取这一年所有的日期实例:Array
u.getAllOfYear()
	
#获取这个月有多少周（按照首日非周日则并入上月计算):Number
u.getWeeksOfMonth()
	
#获取前一天:UcarDate
u.preDay()
	
#获取后一天:UcarDate
u.nextDay()

#获取上一周所有的日期实例:Array
u.getAllOfPreWeek()

#获取下一周所有的日期实例:Array
u.getAllOfNextWeek()

#获取上个月所有的日期实例:Array
u.getAllOfPreMonth()

#获取下个月所有的日期实例:Array
u.getAllOfNextMonth()

#获取上一年所有的日期实例:Array
u.getAllOfPreYear()

#获取下一年所有的日期实例:Array
u.getAllOfNextYear()

#获取与指定时间之间的偏移量:Number(date:Date/String/Number/UcarDate)
u.getOffsetOfDate()
#eg:
	u.getOffsetOfDate('2016-08-21') 
	/* -184 */ /* u当前日期为0往前数的第184天 */

#获取指定范围内的所有日期实例:Array(date:Date/String/Number, range:Number, reverse(!required):Boolean)
u.getAllOfRange()
#eg: 
	u.getAllOfRange('2014-04-17', 2)
	/* [{..., date: 17},{..., date: 18}] */
	
	u.getAllOfRange('2014-04-17', 2, true)
	/* [{..., date: 16},{..., date: 17}] */


```