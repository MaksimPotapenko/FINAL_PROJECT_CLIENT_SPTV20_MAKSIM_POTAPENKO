export interface IShoppingCartItem {
  id: number
  name: string
  price: number
  image: string
  in_stock: number
  theme: string
  count: number
  total_price: number
  userId: number
  setId: number
}

export interface IAddToCartFx {
  url: string
  username: string
  setId: number
}

export interface IUpdateCartItemFx {
  url: string
  payload: {
    total_price?: number
    count?: number
  }
}

export interface ICartItemCounterProps {
  totalCount: number
  setId: number
  initialCount: number
  increasePrice: VoidFunction
  decreasePrice: VoidFunction
}
