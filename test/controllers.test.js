const chai = require('chai');
const app = require('../app');
const expect = chai.expect;

describe('Controllers', () => {
    it('should fetch data on GET /api/users', async () => {
        const res = await chai.request(app).get('/api/users');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add more assertions based on your response structure
    });

    it('should create data on POST /api/users', async () => {
        const userData = {
            "name": "goro",
            "age": 15,
            "occupation": "run",
            "value": 40
          };
        const res = await chai.request(app).post('/api/users').send(userData);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        // Add more assertions based on your response structure
    })
})