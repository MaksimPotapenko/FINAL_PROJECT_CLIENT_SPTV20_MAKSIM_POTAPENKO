import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { setFilteredLegoSets } from '@/context/legoSets'
import { getLegoSetsFx } from '@/app/api/legoSets'

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

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 1000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const legoQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('lego', router) as string)
  )
  const isValidLegoQuery =
    Array.isArray(legoQueryValue) && !!legoQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidLegoQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    legoQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getLegoSetsFx(`/lego-sets?limit=20&offset=${path}`)

  setFilteredLegoSets(data)
}

export async function UpdateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.lego
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getLegoSetsFx(`/lego-sets?limit=20&offset=${path}`)

  setFilteredLegoSets(data)
}
