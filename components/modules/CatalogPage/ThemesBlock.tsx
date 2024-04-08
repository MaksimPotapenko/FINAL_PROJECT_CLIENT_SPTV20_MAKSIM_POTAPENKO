import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { motion } from 'framer-motion'
import styles from '@/styles/catalog/index.module.scss'
import { IThemesBlockProps } from '@/types/catalog'

const ThemesBlock = ({ title }: IThemesBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.dashboard__alert} ${darkModeClass}`}
    >
      <h3 className={`${styles.themes__title} ${darkModeClass}`}>{title}</h3>
      <ul className={styles.themes__list}>
        {[].map((item) => (
          <li key={item} />
        ))}
      </ul>
    </motion.div>
  )
}

export default ThemesBlock
