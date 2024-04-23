import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { removeFromCartFx } from '@/app/api/shoppingCart'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'

export const usePrice = (
  count: number,
  setId: number,
  initialPrice: number
) => {
  const spinner = useStore(removeFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  useEffect(() => {
    updateTotalPrice(price, setId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(setId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
