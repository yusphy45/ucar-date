'use strict';

var fillZero = function (num, total) {
  if ( total === void 0 ) total = 2;

  var length = ("" + num).length;
  return length < total ? ("" + ('0'.repeat(total - length)) + num) : ("" + num);
};
var addProperty = function (key, value) {
  Object.defineProperty(this, key, { configurable: true, enumerable: true, value: value, writable: false });
};
var ucarDate = function ucarDate(date) {
  var result = new Date;
  if (date instanceof Date) { result = date; }
  if (typeof date === 'number') { result.setTime(date); }
  var reg = /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/;
  if (typeof date === 'string' && reg.test(date)) {
    var arr = date.match(reg);
    result.setFullYear(parseInt(arr[1]), arr[2] - 1, arr[3]);
  }
  var add = addProperty.bind(this);
  add('value', result);
  add('timestamp', this.value.getTime());
  add('year', this.value.getFullYear());
  add('month', this.value.getMonth() + 1);
  add('date', this.value.getDate());
  add('day', this.value.getDay());
  add('isLeapYear', this.year % 4 === 0);
  add('isLongMonth', [1, 3, 5, 7, 8, 10, 12].indexOf(this.month) !== -1);
  add('firstDayOfMonth', this.value.getTime());
  var temp = new Date;
  temp.setFullYear(this.year, this.month - 1, 1);
  add('firstDayOfMonth', temp.getTime());
  add('offsetOfLastMonth', (new Date(this.firstDayOfMonth)).getDay());
};

ucarDate.prototype.getDateStr = function getDateStr (format) {
    if ( format === void 0 ) format = 'yyyy-MM-dd';

  return format.replace(/yyyy([\/-])MM([\/-])dd/, ((this.year) + "$1" + (fillZero(this.month)) + "$2" + (fillZero(this.date))));
};

ucarDate.prototype.getDaysOfMonth = function getDaysOfMonth () {
  return this.isLongMonth ? 31 : this.month === 2 ? this.isLeapYear ? 29 : 28 : 30;
};

ucarDate.prototype.getDaysOfYear = function getDaysOfYear () {
  return this.isLeapYear ? 366 : 365;
};

ucarDate.prototype.getWeeksOfMonth = function getWeeksOfMonth () {
  var flag = this.offsetOfLastMonth;
  switch (this.getDaysOfMonth()) {
    case 28:
      return 4;
      break;
    case 29:
      return flag === 0 ? 5 : 4;
      break;
    case 30:
      return flag === 0 || flag > 5 ? 5 : 4;
      break;
    case 31:
      return flag === 0 || flag > 4 ? 5 : 4;
      break;
  }
};

ucarDate.prototype.pre = function pre () {
  return new ucarDate(this.timestamp - 1000 * 60 * 60 * 24);
};

ucarDate.prototype.next = function next () {
  return new ucarDate(this.timestamp + 1000 * 60 * 60 * 24);
};

module.exports = ucarDate;
