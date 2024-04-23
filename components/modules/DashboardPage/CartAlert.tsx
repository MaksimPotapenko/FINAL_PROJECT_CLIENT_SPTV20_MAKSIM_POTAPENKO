import Link from 'next/link'
import { useStore } from 'effector-react'
import { formatPrice } from '@/utils/common'
import { ICartAlertProps } from '../../../types/dashboard'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { $totalPrice } from '@/context/shopping-cart'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const mode = useStore($mode)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'item'
    }

    if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
      return 'items'
    }

    return 'items'
  }

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          There is {count} {showCountMessage(`${count}`)} in cart
        </span>
        <span>Total price: {formatPrice(totalPrice)} €</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_cart}>Go to cart</a>
        </Link>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_order}>Checkout</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}

export default CartAlert
