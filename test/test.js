const ucarDate = require('../dist/index.js');
const assert = require('chai').assert;
const foo = new ucarDate('2017-04-17');
describe('ucarDate', function () {
  describe('year', function () {
    it('实例的各属性只读', function () {
      foo.year = 19912;
      assert.equal(2017, foo.year);
    });
  });
  describe('offsetOfLastMonth', function () {
    it('获取这个月的第一天应该是周几，应返回6', function () {
      assert.equal(6, foo.offsetOfLastMonth);
    });
  });
  describe('@getDaysOfMonth', function () {
    it('获取这个月有多少天，应返回30', function () {
      assert.equal(30, foo.getDaysOfMonth());
    });
  });
  describe('@getDaysOfYear', function () {
    it('获取这一年应该有多少天，应返回365', function () {
      assert.equal(365, foo.getDaysOfYear());
    });
  });
  describe('@getDateStr', function () {
    it('获取格式化后的日期字符串, 应返回2017-04-17', function () {
      assert.equal('2017-04-17', foo.getDateStr());
    });
  });
  describe('@getWeeksOfMonth', function () {
    it('获取这个月有多少周（按照首日非周日则并入上月计算), 应返回5周', function () {
      assert.equal(5, foo.getWeeksOfMonth());
    });
  });
  describe('@pre', function () {
    it('获取前一天, 应返回2017-04-16', function () {
      assert.equal('2017-04-16', foo.pre().getDateStr());
    })
  });
  describe('@next', function () {
    it('获取下一天, 应返回2017-04-18', function () {
      assert.equal('2017-04-18', foo.next().getDateStr());
    })
  });
});