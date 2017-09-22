import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Cuadernos } from '.'

const app = () => express(routes)

let userSession, anotherSession, cuadernos

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  cuadernos = await Cuadernos.create({ user })
})

test('POST /cuadernos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, nombre: 'test', tipo: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.tipo).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /cuadernos 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /cuadernos 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cuadernos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${cuadernos.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cuadernos.id)
})

test('GET /cuadernos/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cuadernos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${cuadernos.id}`)
    .send({ access_token: userSession, nombre: 'test', tipo: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cuadernos.id)
  expect(body.nombre).toEqual('test')
  expect(body.tipo).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /cuadernos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${cuadernos.id}`)
    .send({ access_token: anotherSession, nombre: 'test', tipo: 'test' })
  expect(status).toBe(401)
})

test('PUT /cuadernos/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${cuadernos.id}`)
  expect(status).toBe(401)
})

test('PUT /cuadernos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, nombre: 'test', tipo: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cuadernos/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${cuadernos.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /cuadernos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${cuadernos.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /cuadernos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${cuadernos.id}`)
  expect(status).toBe(401)
})

test('DELETE /cuadernos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
