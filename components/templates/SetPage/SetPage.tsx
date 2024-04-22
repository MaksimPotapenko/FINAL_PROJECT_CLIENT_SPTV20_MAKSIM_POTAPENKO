import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/set/index.module.scss'
import { $legoSet } from '@/context/legoSet'
import SetImagesList from '@/components/modules/SetPage/SetImagesList'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import SetAccordion from '@/components/modules/SetPage/SetAccordion'
import SetTabs from '@/components/modules/SetPage/SetTabs'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  $legoSets,
  setLegoSets,
  setLegoSetsByPopularity,
} from '@/context/legoSets'
import { $shoppingCart } from '@/context/shopping-cart'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { getLegoSetsFx } from '@/app/api/legoSets'
import { formatPrice } from '@/utils/common'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { toggleCartItem } from '@/utils/shopping-cart'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'

const SetPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const legoSet = useStore($legoSet)
  const legoSets = useStore($legoSets)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.setId === legoSet.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getLegoSetsFx.pending)

  useEffect(() => {
    loadlegoSet()
  }, [])

  const loadlegoSet = async () => {
    try {
      const data = await getLegoSetsFx('/lego-sets?limit=20&offset=0')

      setLegoSets(data)
      setLegoSetsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const toggleToCart = () => toggleCartItem(user.username, legoSet.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.set__top} ${darkModeClass}`}>
          <h2>{legoSet.name}</h2>
          <div className={styles.set__inner}>
            <SetImagesList />
            <div className={styles.set__info}>
              <span className={`${styles.set__info__price} ${darkModeClass}`}>
                {formatPrice(legoSet.price || 0)} €
              </span>
              <span className={styles.set__info__stock}>
                {legoSet.in_stock > 0 ? (
                  <span className={styles.set__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.set__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.set__info__code}>
                Артикул: {legoSet.vendor_code}
              </span>
              <button
                className={`${styles.set__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.set__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <SetTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.set__accordion}>
            <div className={styles.set__accordion__inner}>
              <SetAccordion title="Описание">
                <div
                  className={`${styles.set__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.set__tabs__content__title} ${darkModeClass}`}
                  >
                    {legoSet.name}
                  </h3>
                  <p
                    className={`${styles.set__tabs__content__text} ${darkModeClass}`}
                  >
                    {legoSet.description}
                  </p>
                </div>
              </SetAccordion>
            </div>
          </div>
        )}
        <div className={styles.set__bottom}>
          <h2 className={`${styles.set__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToSetPage
            spinner={spinnerSlider}
            items={legoSets.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default SetPage
