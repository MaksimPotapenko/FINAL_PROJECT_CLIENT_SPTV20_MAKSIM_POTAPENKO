import { idGenerator } from './common'

const createThemeCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const legoThemes = [
  'Star Wars',
  'Batman',
  'Harry Potter',
  'Disney',
  'Marvel',
  'Lord of the Rings',
  'Indiana Jones',
  'Jurassic World',
  'NINJAGO',
  'Minecraft',
  'Classic',
  'City',
].map(createThemeCheckboxObj)
