/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $legoSet } from '@/context/legoSet'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SetImagesItem from './SetImagesItem'
import SetSlider from './SetSlider'
import styles from '@/styles/set/index.module.scss'

const SetImagesList = () => {
  const legoSet = useStore($legoSet)
  const isMobile = useMediaQuery(850)
  const images = legoSet.images ? (JSON.parse(legoSet.images) as string[]) : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.set__images}>
      {isMobile ? (
        <SetSlider images={images} />
      ) : (
        <>
          <div className={styles.set__images__main}>
            <img src={currentImgSrc || images[0]} alt={legoSet.name} />
          </div>
          <ul className={styles.set__images__list}>
            {images.map((item, i) => (
              <SetImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default SetImagesList
