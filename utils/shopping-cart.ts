import { toast } from 'react-toastify'
import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'

export const toggleCartItem = async (
  username: string,
  setId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${setId}`)
      removeShoppingCartItem(setId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      setId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const removeItemFromCart = async (setId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${setId}`)
    removeShoppingCartItem(setId)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const updateTotalPrice = async (total_price: number, setId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total-price/${setId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ setId, total_price: data.total_price })
}
