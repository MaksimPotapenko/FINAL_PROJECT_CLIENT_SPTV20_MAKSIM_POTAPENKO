import { $mode } from '@/context/mode'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import { useStore } from 'effector-react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import {
  $legoThemes,
  setLegoSetsThemes,
  updateLegoSetsThemes,
} from '@/context/legoSets'
import { useState } from 'react'
import FiltersPopup from './FiltersPopup'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const legoThemes = useStore($legoThemes)
  const [openLegos, setOpenLegos] = useState(false)
  const handleOpenLegos = () => setOpenLegos(true)
  const handleCloseLegos = () => setOpenLegos(false)
  const isAnyLegoThemeChecked = legoThemes.some((item) => item.checked)
  const isMobile = useMediaQuery(820)

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  const resetAllLegoThemes = () =>
    setLegoSetsThemes(legoThemes.map((item) => ({ ...item, checked: false })))

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={`${styles.catalog__bottom__filters__inner}`}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__theme}>
          <button
            className={`${styles.filters__theme__btn} ${darkModeClass}`}
            onClick={handleOpenLegos}
          >
            Темы наборов
          </button>
          <FiltersPopup
            title="Темы наборов"
            resetFilterBtnDisabled={!isAnyLegoThemeChecked}
            updateTheme={updateLegoSetsThemes}
            setTheme={setLegoSetsThemes}
            applyFilters={applyFiltersAndClosePopup}
            themesList={legoThemes}
            resetAllThemes={resetAllLegoThemes}
            handleClosePopup={handleCloseLegos}
            openPopup={openLegos}
          />
        </div>
      </div>
      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={`${styles.filters__theme__btn} ${darkModeClass}`}
          hideArrowClass={styles.hide_arrow}
          isMobileForFilters={isMobile}
        >
          <div className={styles.filters__theme__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>
      <div className={`${styles.filters__actions}`}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
