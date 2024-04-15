import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import {
  $legoThemes,
  setLegoSetsThemes,
  updateLegoSetsThemes,
} from '@/context/legoSets'
import FilterThemeAccordion from './FilterThemeAccordion'

const CatalogFiltersDesktop = () => {
  const mode = useStore($mode)
  const legoThemes = useStore($legoThemes)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фильтры
      </h3>
      <div className={styles.filters__boiler_theme}>
        <FilterThemeAccordion
          themesList={legoThemes}
          title="Темы наборов:"
          updateTheme={updateLegoSetsThemes}
          setTheme={setLegoSetsThemes}
        />
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
