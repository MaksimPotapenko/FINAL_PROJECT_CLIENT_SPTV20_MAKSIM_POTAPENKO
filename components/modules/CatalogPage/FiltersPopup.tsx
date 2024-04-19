import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import FilterThemeAccordion from './FilterThemeAccordion'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllThemes,
  handleClosePopup,
  updateTheme,
  setTheme,
  applyFilters,
  openPopup,
  title,
  themesList,
}: IFiltersPopupProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.filters__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllThemes}
          closePopup={handleClosePopup}
        />
        <FilterThemeAccordion
          themesList={themesList}
          title={false}
          updateTheme={updateTheme}
          setTheme={setTheme}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Показать
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
