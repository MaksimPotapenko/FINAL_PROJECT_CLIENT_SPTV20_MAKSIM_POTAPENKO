import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterFilterAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'

const FilterThemeAccordion = ({
  themesList,
  title,
  updateTheme,
  setTheme,
}: IFilterFilterAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  const chooseAllThemes = () =>
    setTheme(themesList.map((item) => ({ ...item, checked: true })))

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__theme__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__theme__inner}>
        <button
          className={styles.filters__theme__select_all}
          onClick={chooseAllThemes}
        >
          Выбрать все
        </button>
        <ul className={styles.filters__theme__list}>
          {themesList.map((item) => (
            <FilterCheckboxItem
              title={item.title}
              id={item.id}
              key={item.id}
              checked={item.checked}
              event={updateTheme}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  )
}

export default FilterThemeAccordion
