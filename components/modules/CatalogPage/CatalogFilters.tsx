import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $legoThemes, setLegoThemesFromQuery } from '@/context/legoSets'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import {
  UpdateParamsAndFilters,
  checkQueryParams,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterQuery,
  closePopup,
  filtersMobileOpen,
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
      const {
        isValidLegoQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        legoQueryValue,
      } = checkQueryParams(router)

      const legoQuery = `&lego=${getQueryParamOnFirstRender('lego', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidLegoQuery && isValidPriceQuery) {
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

      if (isValidPriceQuery) {
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
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Invalid filter url')
        return
      }

      toast.error(err.message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
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
          `${initialPage}${priceQuery}${legoQuery}`,
          router
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
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (legos.length) {
        UpdateParamsAndFilters(
          {
            lego: encodedLegoQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${legoQuery}`,
          router
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
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
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
