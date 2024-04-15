import { Event } from 'effector-next'

export interface IThemesBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  themesList: IFilterCheckboxItem[]
}

export interface IThemesBlockItem {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
  offset: string
  firs: string
  lego: string
  sets: string
  priceFrom: string
  priceTo: string
  partId: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

export interface IFilterFilterAccordionProps {
  themesList: IFilterCheckboxItem[]
  title: string | false
  setTheme: Event<IFilterCheckboxItem[]>
  updateTheme: Event<IFilterCheckboxItem>
}

export interface ICatalogFiltersProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface IPriceRangeProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterDesktopProps extends ICatalogFiltersProps {
  spinner: boolean
  resetFilters: VoidFunction
}
