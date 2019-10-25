const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const UserModel = require('../src/components/User/model').default;
chai.should();

/**
 * API tests
 */
describe('API', () => {
    it('get all users', (done) => {
        request(app)
            .get('/v1/users')
            .set('Cookie', global.cookie)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
            })
            .end(done);
    });

    it('create new user', (done) => {
        const newUser = {
            email: 'new.user@gmail.com',
            name: 'John Doe'
        };

        request(app)
            .post('/v1/users')
            .send(newUser)
            .set('Cookie', global.cookie)
            .expect((res) => {
                res.status.should.equal(201);
                res.body.should.have.property('email');
            })
            .end(done);
    });
});

/**
 * clear database after tests
 */
after(async () => {
    try {
        await UserModel.collection.drop();
    } catch (error) {
        console.log('Something went wrong after tests, seems your database doesnt cleaned');
    }
});
