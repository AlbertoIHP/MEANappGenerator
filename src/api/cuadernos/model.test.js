import { Cuadernos } from '.'
import { User } from '../user'

let user, cuadernos

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  cuadernos = await Cuadernos.create({ user, nombre: 'test', tipo: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cuadernos.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cuadernos.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.nombre).toBe(cuadernos.nombre)
    expect(view.tipo).toBe(cuadernos.tipo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cuadernos.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cuadernos.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.nombre).toBe(cuadernos.nombre)
    expect(view.tipo).toBe(cuadernos.tipo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
