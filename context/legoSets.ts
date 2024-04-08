import { ILegoSets } from '@/types/legosets'
import { createDomain } from 'effector'

const legoSets = createDomain()

export const setLegoSets = legoSets.createEvent<ILegoSets>()

export const setLegoSetsCheapFirst = legoSets.createEvent<ILegoSets>()
export const setLegoSetsExpensiveFirst = legoSets.createEvent<ILegoSets>()
export const setLegoSetsByPopularity = legoSets.createEvent<ILegoSets>()

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
