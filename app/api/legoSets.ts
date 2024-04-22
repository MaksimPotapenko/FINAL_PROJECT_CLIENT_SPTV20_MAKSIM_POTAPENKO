import { createEffect } from 'effector-next'
import api from '../axiosClient'

export const getBestsellersOrNewSetsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getLegoSetsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getLegoSetFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})
