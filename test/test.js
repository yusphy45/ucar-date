import UcarDate from '../dist/index.js';
import { assert } from 'chai';
const foo = new UcarDate('2017-02-21');
describe('UcarDate', function () {
  describe('offsetOfLastMonth', function () {
    it('获取这个月的第一天应该是周几', function () {
      assert.equal(3, foo.offsetOfLastMonth);
    });
  });
  describe('@getAllOfWeek', function () {
    it('获取这周所有的日期实例', function () {
      const result = foo.getAllOfWeek();
      assert.equal(7, result.length);
      assert.equal('2017-02-20', result[0].getDateStr());
      assert.equal(1, result[0].day);
      assert.equal('2017-02-26', result[result.length - 1].getDateStr());
      assert.equal(0, result[result.length - 1].day);
    });
  });
  describe('@getDaysOfMonth', function () {
    it('获取这个月有多少天', function () {
      assert.equal(28, foo.getDaysOfMonth());
    });
  });
  describe('@getAllOfMonth', function () {
    it('获取这个月所有的日期实例', function () {
      const result = foo.getAllOfMonth();
      assert.equal(28, result.length);
      assert.equal('2017-02-01', result[0].getDateStr());
      assert.equal('2017-02-28', result[result.length - 1].getDateStr());
    });
  });
  describe('@getDaysOfYear', function () {
    it('获取这一年有多少天', function () {
      assert.equal(365, foo.getDaysOfYear());
    });
  });
  describe('@getAllOfYear', function () {
    it('获取这一年所有的日期实例', function () {
      const result = foo.getAllOfYear();
      assert.equal(365, result.length);
      assert.equal('2017-01-01', result[0].getDateStr());
      assert.equal('2017-12-31', result[result.length - 1].getDateStr());
    });
  });
  describe('@getDateStr', function () {
    it('获取格式化后的日期字符串', function () {
      assert.equal('2017@02@21', foo.getDateStr('yyyy@MM@dd'));
      assert.equal('2017-02-21', foo.dateStr);
    });
  });
  describe('@getWeeksOfMonth', function () {
    it('获取这个月有多少周（按照首日非周日则并入上月计算)', function () {
      assert.equal(4, foo.getWeeksOfMonth());
    });
  });
  describe('@preDay', function () {
    it('获取前一天', function () {
      assert.equal('2017-02-20', foo.preDay().getDateStr());
    });
  });
  describe('@nextDay', function () {
    it('获取下一天', function () {
      assert.equal('2017-02-22', foo.nextDay().getDateStr());
    });
  });
  describe('@getAllOfPreWeek', function () {
    it('获取上一周所有的日期实例', function () {
      const result = foo.getAllOfPreWeek();
      assert.equal(7, result.length);
      assert.equal('2017-02-13', result[0].getDateStr());
      assert.equal(1, result[0].day);
      assert.equal('2017-02-19', result[result.length - 1].getDateStr());
      assert.equal(0, result[result.length - 1].day);
    });
  });
  describe('@getAllOfNextWeek', function () {
    it('获取下一周所有的日期实例', function () {
      const result = foo.getAllOfNextWeek();
      assert.equal(7, result.length);
      assert.equal('2017-02-27', result[0].getDateStr());
      assert.equal(1, result[0].day);
      assert.equal('2017-03-05', result[result.length - 1].getDateStr());
      assert.equal(0, result[result.length - 1].day);
    });
  });
  describe('@getAllOfPreMonth', function () {
    it('获取上个月所有的日期实例', function () {
      const result = foo.getAllOfPreMonth();
      assert.equal(31, result.length);
      assert.equal('2017-01-01', result[0].getDateStr());
      assert.equal('2017-01-31', result[result.length - 1].getDateStr());
    });
  });
  describe('@getAllOfNextMonth', function () {
    it('获取下个月所有的日期实例', function () {
      const result = foo.getAllOfNextMonth();
      assert.equal(31, result.length);
      assert.equal('2017-03-01', result[0].getDateStr());
      assert.equal('2017-03-31', result[result.length - 1].getDateStr());
    });
  });
  describe('@getAllOfPreYear', function () {
    it('获取上一年所有的日期实例', function () {
      const result = foo.getAllOfPreYear();
      assert.equal(366, result.length);
      assert.equal('2016-01-01', result[0].getDateStr());
      assert.equal('2016-12-31', result[result.length - 1].getDateStr());
    });
  });
  describe('@getAllOfNextYear', function () {
    it('获取下一年所有的日期实例', function () {
      const result = foo.getAllOfNextYear();
      assert.equal(365, result.length);
      assert.equal('2018-01-01', result[0].getDateStr());
      assert.equal('2018-12-31', result[result.length - 1].getDateStr());
    });
  });
  describe('@getAllOfRange', function () {
    it('获取指定范围内的所有日期实例', function () {
      const arr = foo.getAllOfRange('2018-02-05', 40);
      assert.equal(40, arr.length);
      assert.equal('2018-02-05', arr[0].getDateStr());
      assert.equal('2018-03-16', arr[arr.length - 1].getDateStr());
      const preArr = foo.getAllOfRange('2018-02-05', 40, true);
      assert.equal(40, preArr.length);
      assert.equal('2017-12-28', preArr[0].getDateStr());
      assert.equal('2018-02-05', preArr[arr.length - 1].getDateStr());
    });
  });
  describe('@getOffsetOfDate', function () {
    it('获取与指定时间之间的偏移量, 不包含当日', function () {
      assert.equal(-1, foo.getOffsetOfDate('2017-02-20'));
      assert.equal(349, foo.getOffsetOfDate('2018-02-05'));
      assert.equal(181, foo.getOffsetOfDate('2017-08-21'));
      assert.equal(-184, foo.getOffsetOfDate('2016-08-21'));
    });
  });
});