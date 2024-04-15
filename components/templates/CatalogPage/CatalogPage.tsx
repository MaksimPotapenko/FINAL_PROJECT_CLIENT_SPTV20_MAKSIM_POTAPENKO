import { getLegoSetsFx } from '@/app/api/legoSets'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ThemesBlock from '@/components/modules/CatalogPage/ThemesBlock'
import {
  $legoSets,
  $legoThemes,
  setLegoSets,
  setLegoSetsThemes,
  updateLegoSetsThemes,
} from '@/context/legoSets'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { ILegoSets } from '@/types/legosets'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const legoThemes = useStore($legoThemes)
  const legoSets = useStore($legoSets)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const pagesCount = Math.ceil(legoSets.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyLegoThemeChecked = legoThemes.some((item) => item.checked)
  const resetFilterBtnDisabled = !(isPriceRangeChanged || isAnyLegoThemeChecked)

  useEffect(() => {
    loadLegoSets()
  }, [])

  console.log(legoSets.rows)

  const loadLegoSets = async () => {
    setSpinner(true)
    try {
      const data = await getLegoSetsFx('/lego-sets?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setLegoSets(data)
          return
        }
      }

      const offset = +query.offset - 1
      const result = await getLegoSetsFx(`/lego-sets?limit=20&offset=${offset}`)

      setCurrentPage(offset)
      setLegoSets(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: ILegoSets) => {
    setCurrentPage(0)
    setLegoSets(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getLegoSetsFx(`/lego-sets?limit=20&offset=0`)

      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const result = await getLegoSetsFx(
        `/lego-sets?limit=20&offset=${selected}`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setLegoSets(result)
    } catch (error) {}
  }

  const resetFilters = async () => {
    try {
      const data = await getLegoSetsFx(`/lego-sets?limit=20&offset=0`)

      setLegoSetsThemes(legoThemes.map((item) => ({ ...item, checked: false })))

      setLegoSets(data)
      setPriceRange([0, 1000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyLegoThemeChecked && (
              <ThemesBlock
                title="Темы наборов:"
                event={updateLegoSetsThemes}
                themesList={legoThemes}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {legoSets.rows?.length ? (
                  legoSets.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
