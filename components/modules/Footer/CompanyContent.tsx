import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const CompanyContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/about" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>О компании</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/contacts" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>
          Обратная связь
        </a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/providers" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>
          Поставщикам
        </a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/contacts" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Контакты</a>
      </Link>
    </li>
  </ul>
)

export default CompanyContent
