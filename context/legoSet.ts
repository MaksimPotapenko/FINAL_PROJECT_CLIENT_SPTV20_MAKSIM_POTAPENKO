import { ILegoSet } from '@/types/legosets'
import { createDomain } from 'effector'

const legoSet = createDomain()

export const setLegoSet = legoSet.createEvent<ILegoSet>()

export const $legoSet = legoSet
  .createStore<ILegoSet>({} as ILegoSet)
  .on(setLegoSet, (_, set) => set)
