## ucar-date
[![Npm Staus](https://img.shields.io/badge/npm-v0.0.1-orange.svg)](https://www.npmjs.com/package/ucar-date)
[![Build Status](https://travis-ci.org/yusphy45/ucar-Date.svg?branch=master)](https://travis-ci.org/yusphy45/ucar-Date)
[![Coverage Status](https://coveralls.io/repos/github/yusphy45/ucar-Date/badge.svg?branch=master)](https://coveralls.io/github/yusphy45/ucar-Date?branch=master)
> 神州优车Date工具集合

## Usage

	const ucarDate = require('ucar-date')
	
	let u = new ucarDate()
	
> ucarDate 可以接受1个参数 yyyy-MM-dd/yyyy/MM/dd 初始化指定日期

## Property
	# 传入或默认的时间值:Date
	value
	
	# 时间戳:Number
	timestamp
	
	# 年:Number
	year
	
	# 月:Number
	month
	
	# 月中的第几日:Number
	date
	
	# 周几:Number
	day
	
	# 是否是闰年:Boolean
	isLeapYear
	
	# 是否是较长月份:Boolean
	isLongMonth
	
	# 当月1号周几:Number
	offsetOfLastMonth
	
## API
	#获取格式化后的日期字符串
	u.getDateStr() 默认格式：yyyy-MM-dd
	
	#获取这个月有多少天
	u.getDaysOfMonth
	
	#获取这一年应该有多少天
	u.getDaysOfYear
	
	#获取这个月有多少周（按照首日非周日则并入上月计算)
	u.getWeeksOfMonth
	
	#获取前一天
	u.pre
	
	#获取后一天
	u.next