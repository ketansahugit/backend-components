const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp); // middleware

describe('Route', () => {
    it('should return a welcome message on GET /', async () => {
        const res = await chai.request(app).get('/');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to your API!');
    });

    // Add more route tests based on your application's routes
});
