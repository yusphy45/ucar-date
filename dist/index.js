var fillZero = function (num, total) {
  if ( total === void 0 ) total = 2;

  var length = ("" + num).length;
  return length < total ? ("" + ('0'.repeat(total - length)) + num) : ("" + num);
};
var addProperty = function (key, value) {
  Object.defineProperty(this, key, { configurable: true, enumerable: true, value: value, writable: false });
};
var ONEDAY = 1000 * 60 * 60 * 24;
var UcarDate = function UcarDate(date) {
  var result = new Date();
  if (date instanceof Date) { result = date; }
  if (typeof date === 'number') { result.setTime(date); }
  var reg = /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/;
  if (typeof date === 'string' && reg.test(date)) {
    var arr = date.match(reg);
    result.setFullYear(parseInt(arr[1]), arr[2] - 1, arr[3]);
  }
  var add = addProperty.bind(this);
  result.setHours(0, 0, 1);
  add('value', result);
  add('timestamp', this.value.getTime());
  add('year', this.value.getFullYear());
  add('month', this.value.getMonth() + 1);
  add('date', this.value.getDate());
  add('day', this.value.getDay());
  add('isLeapYear', this.year % 4 === 0);
  add('isLongMonth', [1, 3, 5, 7, 8, 10, 12].indexOf(this.month) !== -1);
  var firstDayOfWeek = new Date();
  firstDayOfWeek.setTime(this.timestamp - ONEDAY * this.day);
  add('firstDayOfWeek', firstDayOfWeek);
  var firstDayOfMonth = new Date();
  firstDayOfMonth.setFullYear(this.year, this.month - 1, 1);
  add('firstDayOfMonth', firstDayOfMonth);
  var firstDayOfYear = new Date();
  firstDayOfYear.setFullYear(this.year, 0, 1);
  add('firstDayOfYear', firstDayOfYear);
  add('offsetOfLastMonth', (new Date(this.firstDayOfMonth.getTime())).getDay());
};

UcarDate.prototype.getDateStr = function getDateStr (format) {
    if ( format === void 0 ) format = 'yyyy-MM-dd';

  return format.replace(/yyyy([\/-])MM([\/-])dd/, ((this.year) + "$1" + (fillZero(this.month)) + "$2" + (fillZero(this.date))));
};

UcarDate.prototype.getAllOfRange = function getAllOfRange (date, range, reverse) {
    if ( range === void 0 ) range = 0;
    if ( reverse === void 0 ) reverse = false;

  var one = new UcarDate(date);
  var arr = [];
  for (var i = 0; i < range; i += 1, one = reverse ? one.preDay() : one.nextDay()) {
    reverse ? arr.unshift(one) : arr.push(one);
  }
  return arr;
};

UcarDate.prototype.getOffsetOfDate = function getOffsetOfDate (date) {
  if (!(date instanceof UcarDate)) { date = new UcarDate(date); }
  return parseInt(((date.timestamp - this.timestamp) / ONEDAY).toFixed(0), 10);
};

UcarDate.prototype.getAllOfWeek = function getAllOfWeek () {
  return this.getAllOfRange(this.firstDayOfWeek, 7);
};

UcarDate.prototype.getDaysOfMonth = function getDaysOfMonth () {
  return this.isLongMonth ? 31 : this.month === 2 ? this.isLeapYear ? 29 : 28 : 30;
};

UcarDate.prototype.getAllOfMonth = function getAllOfMonth () {
  return this.getAllOfRange(this.firstDayOfMonth, this.getDaysOfMonth());
};

UcarDate.prototype.getDaysOfYear = function getDaysOfYear () {
  return this.isLeapYear ? 366 : 365;
};

UcarDate.prototype.getAllOfYear = function getAllOfYear () {
  return this.getAllOfRange(this.firstDayOfYear, this.getDaysOfYear());
};

UcarDate.prototype.getWeeksOfMonth = function getWeeksOfMonth () {
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

UcarDate.prototype.preDay = function preDay () {
  return new UcarDate(this.timestamp - ONEDAY);
};

UcarDate.prototype.nextDay = function nextDay () {
  return new UcarDate(this.timestamp + ONEDAY);
};

UcarDate.prototype.getAllOfPreWeek = function getAllOfPreWeek () {
  var u = new UcarDate(this.timestamp - ONEDAY * 7);
  return u.getAllOfWeek();
};

UcarDate.prototype.getAllOfNextWeek = function getAllOfNextWeek () {
  var u = new UcarDate(this.timestamp + ONEDAY * 7);
  return u.getAllOfWeek();
};

UcarDate.prototype.getAllOfPreMonth = function getAllOfPreMonth () {
  var u = new UcarDate(this.firstDayOfMonth).preDay();
  return u.getAllOfMonth();
};

UcarDate.prototype.getAllOfNextMonth = function getAllOfNextMonth () {
  var u = new UcarDate((new Date(this.timestamp)).setMonth(this.month));
  return u.getAllOfMonth();
};

UcarDate.prototype.getAllOfPreYear = function getAllOfPreYear () {
  var u = new UcarDate(this.firstDayOfYear).preDay();
  return u.getAllOfYear();
};

UcarDate.prototype.getAllOfNextYear = function getAllOfNextYear () {
  var u = new UcarDate((new Date(this.timestamp)).setYear(this.year + 1));
  return u.getAllOfYear();
};

export default UcarDate;
