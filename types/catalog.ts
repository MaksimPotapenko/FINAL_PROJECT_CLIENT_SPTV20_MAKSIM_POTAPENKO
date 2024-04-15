import { Event } from 'effector-next'

export interface IThemesBlockProps {
  title: string
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
