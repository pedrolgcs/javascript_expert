const assert = require('assert');
const { describe, it } = require('mocha');
const supertest = require('supertest');
const { app } = require('../api');

describe('Api Suite test', () => {
  describe('/hi', () => {
    it('should be able to request an inexistent route and redirect to default router', async () => {
      const expectedResponseText = 'hello world';

      const sut = await supertest(app).get('/hi');

      assert.equal(sut.status, 200);
      assert.deepStrictEqual(sut.text, expectedResponseText);
    });
  });

  describe('/contact', () => {
    it('should be able to request the contact page and return HTTP status code 200', async () => {
      const expectedResponseText = 'contact us page';

      const sut = await supertest(app).get('/contact');

      assert.equal(sut.status, 200);
      assert.deepStrictEqual(sut.text, expectedResponseText);
    });
  });

  describe('/login', () => {
    it('should be able to request successfully on the login route and return HTTP status code 200', async () => {
      const expectedResponseText = 'Logging has succeeded';

      const sut = await supertest(app)
        .post('/login')
        .send({ username: 'pedro', password: '123' });

      assert.equal(sut.status, 200);
      assert.deepStrictEqual(sut.text, expectedResponseText);
    });

    it('should be able to request unsuccessfully on the login route and return HTTP status code 401', async () => {
      const expectedResponseText = 'Logging failed';

      const sut = await supertest(app)
        .post('/login')
        .send({ username: 'pedro', password: '456' });

      assert.ok(sut.unauthorized);
      assert.deepStrictEqual(sut.text, expectedResponseText);
    });
  });
});
