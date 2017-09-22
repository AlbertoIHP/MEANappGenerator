import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Cuadernos } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Cuadernos.create({ ...body, user })
    .then((cuadernos) => cuadernos.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cuadernos.find(query, select, cursor)
    .populate('user')
    .then((cuadernos) => cuadernos.map((cuadernos) => cuadernos.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Cuadernos.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((cuadernos) => cuadernos ? cuadernos.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Cuadernos.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cuadernos) => cuadernos ? _.merge(cuadernos, body).save() : null)
    .then((cuadernos) => cuadernos ? cuadernos.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Cuadernos.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cuadernos) => cuadernos ? cuadernos.remove() : null)
    .then(success(res, 204))
    .catch(next)
