const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('create new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      //.set('UseThisFor', 'HeaderParameters')
      .send({
        name: "APAD2",
        email: "bla@conta.com",
        whatsapp: "6699983456",
        city: "Matupá",
        uf: "MT"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
})