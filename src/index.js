const fillZero = (num, total = 2) => {
  const length = `${num}`.length;
  let str = '';
  for(let i = 0; i < total - length; i += 1) {
    str += '0';
  }
  return length < total ? `${str}${num}` : `${num}`;
};
const addProperty = function (key, value) {
  Object.defineProperty(this, key, { configurable: true, enumerable: true, value, writable: false });
};
const ONEDAY = 1000 * 60 * 60 * 24;
class UcarDate {
  constructor(date) {
    let result = new Date();
    if (date instanceof Date) result = date;
    if (typeof date === 'number') result.setTime(date);
    const reg = /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/;
    if (typeof date === 'string' && reg.test(date)) {
      const arr = date.match(reg);
      result.setFullYear(parseInt(arr[1]), arr[2] - 1, arr[3]);
    }
    const add = addProperty.bind(this);
    result.setHours(0, 0, 1);
    add('value', result);
    add('timestamp', this.value.getTime());
    add('year', this.value.getFullYear());
    add('month', this.value.getMonth() + 1);
    add('date', this.value.getDate());
    add('day', this.value.getDay());
    add('isLeapYear', this.year % 4 === 0);
    add('isLongMonth', [1, 3, 5, 7, 8, 10, 12].indexOf(this.month) !== -1);
    const firstDayOfWeek = new Date();
    firstDayOfWeek.setTime(this.timestamp - ONEDAY * (this.day - 1));
    add('firstDayOfWeek', firstDayOfWeek);
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setFullYear(this.year, this.month - 1, 1);
    add('firstDayOfMonth', firstDayOfMonth);
    const firstDayOfYear = new Date();
    firstDayOfYear.setFullYear(this.year, 0, 1);
    add('firstDayOfYear', firstDayOfYear);
    add('offsetOfLastMonth', (new Date(this.firstDayOfMonth.getTime())).getDay());
    add('dateStr', `${fillZero(this.year)}-${fillZero(this.month)}-${fillZero(this.date)}`);
  }

  getDateStr(format = 'yyyy-MM-dd') {
    return format.replace(/yyyy(.)MM(.)dd/, `${this.year}$1${fillZero(this.month)}$2${fillZero(this.date)}`);
  }

  getAllOfRange(date, range = 0, reverse = false) {
    let one = new UcarDate(date);
    const arr = [];
    for (let i = 0; i < range; i += 1, one = reverse ? one.preDay() : one.nextDay()) {
      reverse ? arr.unshift(one) : arr.push(one)
    }
    return arr;
  }

  getOffsetOfDate(date) {
    if (!(date instanceof UcarDate)) date = new UcarDate(date);
    return parseInt(((date.timestamp - this.timestamp) / ONEDAY).toFixed(0), 10);
  }

  getAllOfWeek() {
    return this.getAllOfRange(this.firstDayOfWeek, 7);
  }

  getDaysOfMonth() {
    return this.isLongMonth ? 31 : this.month === 2 ? this.isLeapYear ? 29 : 28 : 30;
  }

  getAllOfMonth() {
    return this.getAllOfRange(this.firstDayOfMonth, this.getDaysOfMonth());
  }

  getDaysOfYear() {
    return this.isLeapYear ? 366 : 365;
  }

  getAllOfYear() {
    return this.getAllOfRange(this.firstDayOfYear, this.getDaysOfYear());
  }

  getWeeksOfMonth() {
    const flag = this.offsetOfLastMonth;
    switch (this.getDaysOfMonth()) {
      case 28:
        return 4;
        break;
      case 29:
        return flag === 1 ? 5 : 4;
        break;
      case 30:
        return flag === 0 || flag > 6 ? 5 : 4;
        break;
      case 31:
        return flag === 0 || flag > 5 ? 5 : 4;
        break;
    }
  }

  preDay() {
    return new UcarDate(this.timestamp - ONEDAY);
  }

  nextDay() {
    return new UcarDate(this.timestamp + ONEDAY);
  }

  getAllOfPreWeek() {
    const u = new UcarDate(this.timestamp - ONEDAY * 7);
    return u.getAllOfWeek();
  }

  getAllOfNextWeek() {
    const u = new UcarDate(this.timestamp + ONEDAY * 7);
    return u.getAllOfWeek();
  }

  getAllOfPreMonth() {
    const u = new UcarDate(this.firstDayOfMonth).preDay();
    return u.getAllOfMonth();
  }

  getAllOfNextMonth() {
    const u = new UcarDate((new Date(this.timestamp)).setMonth(this.month));
    return u.getAllOfMonth();
  }

  getAllOfPreYear() {
    const u = new UcarDate(this.firstDayOfYear).preDay();
    return u.getAllOfYear();
  }

  getAllOfNextYear() {
    const u = new UcarDate((new Date(this.timestamp)).setYear(this.year + 1));
    return u.getAllOfYear();
  }
}
export default UcarDate