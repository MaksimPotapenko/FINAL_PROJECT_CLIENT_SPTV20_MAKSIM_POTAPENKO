import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $legoThemes,
  setFilteredLegoSets,
  setLegoThemesFromQuery,
} from '@/context/legoSets'
import { useRouter } from 'next/router'
import { getLegoSetsFx } from '@/app/api/legoSets'
import { getQueryParamOnFirstRender } from '@/utils/common'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterQuery,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const legoThemes = useStore($legoThemes)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      )
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const legoQueryValue = JSON.parse(
        decodeURIComponent(getQueryParamOnFirstRender('lego', router) as string)
      )
      const isValidLegoQuery =
        Array.isArray(legoQueryValue) && !!legoQueryValue?.length

      const legoQuery = `&lego=${getQueryParamOnFirstRender('lego', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidLegoQuery && priceFromQueryValue && priceToQueryValue) {
        setIsFilterQuery(true)
        setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        setIsPriceRangeChanged(true)
        setLegoThemesFromQuery(legoQueryValue)

        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setLegoThemesFromQuery(legoQueryValue)
        }, `${currentPage}${priceQuery}${legoQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidLegoQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterQuery(true)
          setLegoThemesFromQuery(legoQueryValue)
        }, `${currentPage}${legoQuery}`)
        return
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback()

    const data = await getLegoSetsFx(`/lego-sets?limit=20&offset=${path}`)

    setFilteredLegoSets(data)
  }

  async function UpdateParamsAndFilters<T>(updatedParams: T, path: string) {
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

  const applyFilters = async () => {
    setIsFilterQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const legos = legoThemes
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedLegoQuery = encodeURIComponent(JSON.stringify(legos))
      const legoQuery = `&lego=${encodedLegoQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (legos.length && isPriceRangeChanged) {
        UpdateParamsAndFilters(
          {
            lego: encodedLegoQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${legoQuery}`
        )
        return
      }

      if (isPriceRangeChanged) {
        UpdateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`
        )
      }

      if (legos.length) {
        UpdateParamsAndFilters(
          {
            lego: encodedLegoQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${legoQuery}`
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <div />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
