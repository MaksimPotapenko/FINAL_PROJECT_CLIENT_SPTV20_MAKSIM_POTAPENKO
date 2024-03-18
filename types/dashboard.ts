import { ILegoSet } from '@/types/legosets'

export interface IDashboardSlider {
  items: ILegoSet[]
  spinner: boolean
  goToSetPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
