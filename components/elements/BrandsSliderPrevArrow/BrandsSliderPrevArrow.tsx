/* eslint-disable max-len */
import { IBrandsSliderArrow } from '@/types/elements'
import styles from '@/styles/dashboard/index.module.scss'
import BrandSliderArrowSvg from '../BrandSliderArrow/BrandSliderArrow'

const BrandsSliderPrevArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
)

export default BrandsSliderPrevArrow
