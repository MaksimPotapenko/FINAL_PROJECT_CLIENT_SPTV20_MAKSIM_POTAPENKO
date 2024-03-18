export interface ILegoSet {
  id: number
  theme: string
  price: number
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  bestseller: boolean
  new: boolean
  popularity: number
}

export interface ILegoSets {
  count: number
  rows: ILegoSet[]
}
