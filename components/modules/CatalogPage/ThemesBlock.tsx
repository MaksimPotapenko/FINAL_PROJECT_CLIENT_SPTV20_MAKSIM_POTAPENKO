import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '@/styles/catalog/index.module.scss'
import { IThemesBlockProps } from '@/types/catalog'
import ThemesBlockItem from './ThemesBlockItem'

const ThemesBlock = ({ title, themesList, event }: IThemesBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const checkedItems = themesList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.theme} ${darkModeClass}`}
    >
      <h3 className={`${styles.theme__title} ${darkModeClass}`}>{title}</h3>
      <ul className={styles.theme__list}>
        {checkedItems.map((item) => (
          <AnimatePresence key={item.id}>
            <ThemesBlockItem item={item} event={event} />
          </AnimatePresence>
        ))}
      </ul>
    </motion.div>
  )
}

export default ThemesBlock
