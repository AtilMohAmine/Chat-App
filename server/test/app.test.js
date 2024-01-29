import request from 'supertest';
import app from '../app.js';

describe('Express App', () => {
  it('should respond with a 404 status code for an unknown route', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  }); 
});