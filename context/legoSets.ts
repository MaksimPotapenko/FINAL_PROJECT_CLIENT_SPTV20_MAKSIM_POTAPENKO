import { ILegoSets } from '@/types/legosets'
import { createDomain } from 'effector'

const legoSets = createDomain()

export const setLegoSets = legoSets.createEvent<ILegoSets>()

export const $legoSets = legoSets
  .createStore<ILegoSets>({} as ILegoSets)
  .on(setLegoSets, (_, sets) => sets)
