const fillZero = (num, total = 2) => {
  const length = `${num}`.length;
  return length < total ? `${'0'.repeat(total - length)}${num}` : `${num}`;
};
const addProperty = function (key, value) {
  Object.defineProperty(this, key, { configurable: true, enumerable: true, value, writable: false });
};
class ucarDate {
  constructor(date) {
    let result = new Date;
    if (date instanceof Date) result = date;
    if (typeof date === 'number') result.setTime(date);
    const reg = /(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/;
    if (typeof date === 'string' && reg.test(date)) {
      const arr = date.match(reg);
      result.setFullYear(parseInt(arr[1]), arr[2] - 1, arr[3]);
    }
    const add = addProperty.bind(this);
    add('value', result);
    add('timestamp', this.value.getTime());
    add('year', this.value.getFullYear());
    add('month', this.value.getMonth() + 1);
    add('date', this.value.getDate());
    add('day', this.value.getDay());
    add('isLeapYear', this.year % 4 === 0);
    add('isLongMonth', [1, 3, 5, 7, 8, 10, 12].indexOf(this.month) !== -1);
    add('firstDayOfMonth', this.value.getTime());
    const temp = new Date;
    temp.setFullYear(this.year, this.month - 1, 1);
    add('firstDayOfMonth', temp.getTime());
    add('offsetOfLastMonth', (new Date(this.firstDayOfMonth)).getDay());
  }

  getDateStr(format = 'yyyy-MM-dd') {
    return format.replace(/yyyy([\/-])MM([\/-])dd/, `${this.year}$1${fillZero(this.month)}$2${fillZero(this.date)}`);
  }

  getDaysOfMonth() {
    return this.isLongMonth ? 31 : this.month === 2 ? this.isLeapYear ? 29 : 28 : 30;
  }

  getDaysOfYear() {
    return this.isLeapYear ? 366 : 365;
  }

  getWeeksOfMonth() {
    const flag = this.offsetOfLastMonth;
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
  }

  pre() {
    return new ucarDate(this.timestamp - 1000 * 60 * 60 * 24);
  }

  next() {
    return new ucarDate(this.timestamp + 1000 * 60 * 60 * 24);
  }
}
export default ucarDate