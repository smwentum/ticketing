//import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    const cookie = await global.signin()

  //console.log(cookie);
  const response = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  console.log(response.get('Set-Cookie'));
});
