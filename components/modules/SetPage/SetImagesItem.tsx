/* eslint-disable @next/next/no-img-element */
import { ISetImagesItemProps } from '@/types/set'
import styles from '@/styles/set/index.module.scss'

const SetImagesItem = ({ src, callback, alt }: ISetImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.set__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt} />
    </li>
  )
}

export default SetImagesItem
