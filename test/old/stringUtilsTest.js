'use strict';
let expect = require('chai').expect;
let stringUtils = require('../utils/stringUtils');
let _ = require('lodash');

//TODO: Fix test
describe('String to array test', () => {
  it('should return an array when there is no delimiter', (done) => {
    let b = stringUtils.stringToArray('khoa');
    expect(b).to.equal(['khoa']);
    done();
  });

  it('should return elements when there is delimiter', (done) => {
    let b = stringUtils.stringToArray('khoa, khoa1, khoa2');
    expect(b).to.equal(['khoa', 'khoa1', 'khoa2']);
    done();
  });
});