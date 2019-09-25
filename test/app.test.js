'use strict';
const app = require('../app');

const { expect } = require('chai');
const supertest = require('supertest');

describe('GET/ frequency', () => {
  it('returns 400 if input is not provided', () => {
    return supertest(app)
      .get('/frequency')
      .query({s: ''})
      .expect(400, 'Invalid request');
  });
  it('it correctly returns an object when proveded the valid parameters', () => {
    return supertest(app)
      .get('/frequency')
      .query({s: 'catctttg'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then (res => {
        expect(res.body).to.be.an('object');
        expect(res.body.highest).to.be.equal('t');
        expect(res.body.unique).to.be.equal(4);
        expect(res.body.average).to.be.equal(2);
        expect(res.body).to.include
          .keys('average', 'highest', 'unique',
            'c', 'a', 't','g');
      });
  });
  it('if two characters are tied it returns the one closest to the beginning of the alphabet', () => {
    return supertest(app)
      .get('/frequency')
      .query({s: 'catctg'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then (res => {
        expect(res.body.highest).to.be.equal('c');
      });
  });
});