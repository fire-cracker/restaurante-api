import db from '../../database/models'
import { MenuInstance } from '../../database/models/menus'

/**
 * @export
 * @function fetchAllMenus
 * @returns {Object} object
 */
export const fetchAllMenus = (): Promise<{ rows: MenuInstance[]; count: number }> => {
  const menus = db.Menu.findAndCountAll()
  return menus
}

/**
 * @export
 * @function fetchMenu
 * @param {Integer} menuId - menu id
 * @returns {Object} object
 */
export const fetchMenu = (id: number): Promise<MenuInstance> => {
  const menu = db.Menu.findByPk(id)
  return menu
}
