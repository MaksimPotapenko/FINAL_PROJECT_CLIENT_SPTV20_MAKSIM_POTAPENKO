import { $mode } from '@/context/mode'
import LocationSvg from '../LocationSvg/LocationSvg'
import styles from '@/styles/cityButton/index.module.scss'
import { useStore } from 'effector-react'

const CityButton = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  console.log('')
  return (
    <button className={styles.city}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>Narva</span>
    </button>
  )
}

export default CityButton
