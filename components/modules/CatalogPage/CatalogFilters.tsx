import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $legoThemes, setFilteredLegoSets } from '@/context/legoSets'
import { useRouter } from 'next/router'
import { getLegoSetsFx } from '@/app/api/legoSets'

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
        router.push(
          {
            query: {
              ...router.query,
              lego: encodedLegoQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getLegoSetsFx(
          `/lego-sets?limit=20&offset=${initialPage}${priceQuery}${legoQuery}`
        )

        setFilteredLegoSets(data)
        return
      }

      if (isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getLegoSetsFx(
          `/lego-sets?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilteredLegoSets(data)
      }

      if (legos.length) {
        router.push(
          {
            query: {
              ...router.query,
              lego: encodedLegoQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getLegoSetsFx(
          `/lego-sets?limit=20&offset=${initialPage}${legoQuery}`
        )

        setFilteredLegoSets(data)
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
