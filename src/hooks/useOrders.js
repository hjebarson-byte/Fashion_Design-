import useLocalStorage from './useLocalStorage'
import { mockOrders } from '../data/mockOrders'

const isOrderList = (v) => Array.isArray(v) && v.every((o) => o && typeof o.orderNumber === 'string' && Array.isArray(o.items))

/** Locally created demo orders (newest first) plus the seeded mock orders. */
export default function useOrders() {
  const [savedOrders, setSavedOrders] = useLocalStorage('velora_orders', [], isOrderList)

  const addOrder = (order) => setSavedOrders((list) => [order, ...list])
  const orders = [...savedOrders, ...mockOrders]
  const getOrder = (orderNumber) => orders.find((o) => o.orderNumber === orderNumber)

  return { orders, savedOrders, addOrder, getOrder }
}
