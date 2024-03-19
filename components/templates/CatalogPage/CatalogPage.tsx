import { getLegoSetsFx } from '@/app/api/legoSets'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ThemesBlock from '@/components/modules/CatalogPage/ThemesBlock'
import { $legoSets, setLegoSets } from '@/context/legoSets'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'

const CatalogPage = () => {
  const mode = useStore($mode)
  const legoSets = useStore($legoSets)
  const [spinner, setSpinner] = useState(false)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadLegoSets()
  }, [])

  const loadLegoSets = async () => {
    setSpinner(true)
    try {
      const data = await getLegoSetsFx('/lego-sets?limit=20&offset=0')

      setLegoSets(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
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
            <ThemesBlock title="Темы наборов:" />
          </AnimatePresence>
        </div>
        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}
            >
              Сбросить фильтр
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className="">Filters</div>
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
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
