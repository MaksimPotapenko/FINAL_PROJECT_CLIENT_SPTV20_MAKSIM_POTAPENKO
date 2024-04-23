/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $legoSet } from '@/context/legoSet'
import { $mode } from '@/context/mode'
import styles from '@/styles/set/index.module.scss'

const SetTabs = () => {
  const mode = useStore($mode)
  const legoSet = useStore($legoSet)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescription] = useState(true)

  const handleShowDescription = () => {
    setShowDescription(true)
  }

  return (
    <div className={styles.set__tabs}>
      <div className={`${styles.set__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Description
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.set__tabs__content}
        >
          <h3
            className={`${styles.set__tabs__content__title} ${darkModeClass}`}
          >
            {legoSet.name}
          </h3>
          <p className={`${styles.set__tabs__content__text} ${darkModeClass}`}>
            {legoSet.description}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default SetTabs
