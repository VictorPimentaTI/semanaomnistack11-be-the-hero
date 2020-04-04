const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });


  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    //.set('Authorization', '172db0dc')
    .send({
      name: "APAE",
      email: "apae@apae.com.br",
      whatsapp: "1231241431",
      city: "Itabira",
      uf: "MG"
    });

    console.log(response.body);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});