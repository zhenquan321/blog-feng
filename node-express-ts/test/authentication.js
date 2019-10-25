const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const user = require('./fixtures/user.json');
chai.should();

/**
 * storing globals to access them in API requests
 */
global.cookie = '';
/**
 * Authentication tests
 */
describe('Authentication', () => {
    it('sign up', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.cookie = res.header['set-cookie'];
            })
            .end(done)
    });
    it('sign up user with existing email', (done) => {
        request(app)
            .post('/auth/signup')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(400);
            })
            .end(done);
    });
    it('login to app', (done) => {
        request(app)
            .post('/auth/login')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.cookie = res.header['set-cookie'];
            })
            .end(done);
    });
});
