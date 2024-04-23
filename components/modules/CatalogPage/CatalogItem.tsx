/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode'
import { ILegoSet } from '@/types/legosets'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { removeFromCartFx } from '@/app/api/shoppingCart'

const CatalogItem = ({ item }: { item: ILegoSet }) => {
  const user = useStore($user)
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.setId === item.id)
  const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)} alt="item.name" />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Vendor Code: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} €
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ''
        }`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )
}

export default CatalogItem
