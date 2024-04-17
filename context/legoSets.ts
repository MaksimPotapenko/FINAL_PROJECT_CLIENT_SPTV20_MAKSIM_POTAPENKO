import { IFilterCheckboxItem } from '@/types/catalog'
import { ILegoSets } from '@/types/legosets'
import { createDomain } from 'effector'
import { legoThemes } from '@/utils/catalog'

const legoSets = createDomain()

export const setLegoSets = legoSets.createEvent<ILegoSets>()

export const setLegoSetsCheapFirst = legoSets.createEvent()
export const setLegoSetsExpensiveFirst = legoSets.createEvent()
export const setLegoSetsByPopularity = legoSets.createEvent()
export const setLegoSetsThemes = legoSets.createEvent<IFilterCheckboxItem[]>()
export const setFilteredLegoSets = legoSets.createEvent()
export const updateLegoSetsThemes = legoSets.createEvent<IFilterCheckboxItem>()

const updateTheme = (
  themes: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  themes.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

export const $legoSets = legoSets
  .createStore<ILegoSets>({} as ILegoSets)
  .on(setLegoSets, (_, sets) => sets)
  .on(setLegoSetsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setLegoSetsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setLegoSetsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $legoThemes = legoSets
  .createStore<IFilterCheckboxItem[]>(legoThemes as IFilterCheckboxItem[])
  .on(setLegoSetsThemes, (_, sets) => sets)
  .on(updateLegoSetsThemes, (state, payload) => [
    ...updateTheme(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])

export const $filteredLegoThemes = legoSets
  .createStore<ILegoSets>({} as ILegoSets)
  .on(setFilteredLegoSets, (_, sets) => sets)
