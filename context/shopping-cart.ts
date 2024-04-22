import { IShoppingCartItem } from '@/types/shopping-cart'
import { createDomain } from 'effector-next'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()
export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  setId: number
  total_price: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
  setId: number
  count: number
}>()

const remove = (cartItems: IShoppingCartItem[], setId: number) =>
  cartItems.filter((item) => item.setId !== setId)

function updateCartItem<T>(
  cartItems: IShoppingCartItem[],
  setId: number,
  payload: T
) {
  return cartItems.map((item) => {
    if (item.setId === setId) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, setId) => [...remove(state, setId)])
  .on(updateCartItemTotalPrice, (state, { setId, total_price }) => [
    ...updateCartItem(state, setId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { setId, count }) => [
    ...updateCartItem(state, setId, { count }),
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)

export const $disableCart = shoppingCart
  .createStore<boolean>(false)
  .on(setDisableCart, (_, value) => value)
