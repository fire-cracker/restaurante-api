import { Response, Request } from 'express'
import { fetchAllMenus, fetchMenu } from '../services/menus.service'

/**
 * @export
 * @function getAllMenus
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getAllMenus = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const { rows: menus, count } = await fetchAllMenus()
    return res.status(200).send({
      status: 'success',
      data: {
        menus,
        count
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}

/**
 * @export
 * @function getMenu
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getMenu = async ({ params: { id } }: Request, res: Response): Promise<Response<any>> => {
  try {
    // const { context, name } = req.query as { [key: string]: string}
    const menu = await fetchMenu(Number(id))

    if (!menu) {
      return res.status(404).send({
        status: 'fail',
        data: {
          message: 'Menu does not exist'
        }
      })
    }

    return res.status(200).send({
      status: 'success',
      data: {
        menu
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}
