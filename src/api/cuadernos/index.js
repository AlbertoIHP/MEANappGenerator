import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Cuadernos, { schema } from './model'

const router = new Router()
const { nombre, tipo } = schema.tree

/**
 * @api {post} /cuadernos Create cuadernos
 * @apiName CreateCuadernos
 * @apiGroup Cuadernos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam nombre Cuadernos's nombre.
 * @apiParam tipo Cuadernos's tipo.
 * @apiSuccess {Object} cuadernos Cuadernos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cuadernos not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ nombre, tipo }),
  create)

/**
 * @api {get} /cuadernos Retrieve cuadernos
 * @apiName RetrieveCuadernos
 * @apiGroup Cuadernos
 * @apiUse listParams
 * @apiSuccess {Object[]} cuadernos List of cuadernos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /cuadernos/:id Retrieve cuadernos
 * @apiName RetrieveCuadernos
 * @apiGroup Cuadernos
 * @apiSuccess {Object} cuadernos Cuadernos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cuadernos not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /cuadernos/:id Update cuadernos
 * @apiName UpdateCuadernos
 * @apiGroup Cuadernos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam nombre Cuadernos's nombre.
 * @apiParam tipo Cuadernos's tipo.
 * @apiSuccess {Object} cuadernos Cuadernos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cuadernos not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ nombre, tipo }),
  update)

/**
 * @api {delete} /cuadernos/:id Delete cuadernos
 * @apiName DeleteCuadernos
 * @apiGroup Cuadernos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cuadernos not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
