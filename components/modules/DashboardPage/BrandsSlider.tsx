/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import styles from '@/styles/dashboard/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useEffect } from 'react'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const brandItems = [
    { id: 1, img: '/img/brand-1.png', alt: 'brand-1' },
    { id: 2, img: '/img/brand-2.png', alt: 'brand-2' },
    { id: 3, img: '/img/brand-3.png', alt: 'brand-3' },
    { id: 4, img: '/img/brand-4.png', alt: 'brand-4' },
    { id: 5, img: '/img/brand-5.png', alt: 'brand-5' },
    { id: 6, img: '/img/brand-6.png', alt: 'brand-6' },
    { id: 7, img: '/img/brand-7.png', alt: 'brand-7' },
    { id: 8, img: '/img/brand-8.png', alt: 'brand-8' },
    { id: 8, img: '/img/brand-9.png', alt: 'brand-9' },
    { id: 8, img: '/img/brand-10.png', alt: 'brand-10' },
    { id: 8, img: '/img/brand-11.png', alt: 'brand-11' },
  ]

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
