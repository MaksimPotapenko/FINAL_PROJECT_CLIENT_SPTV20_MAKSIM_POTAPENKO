import { getBestsellersOrNewSetsFx } from '@/app/api/legoSets'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/dashboard/index.module.scss'
import { ILegoSets } from '@/types/legosets'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DashboardPage = () => {
  const [newSets, setNewSets] = useState<ILegoSets>({} as ILegoSets)
  const [bestsellers, setBestsellers] = useState<ILegoSets>({} as ILegoSets)
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadLegoSets()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadLegoSets = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewSetsFx(
        '/lego-sets/bestsellers'
      )
      const newSets = await getBestsellersOrNewSetsFx('/lego-sets/new')

      setBestsellers(bestsellers)
      setNewSets(newSets)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          LEGO Sets
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Bestsellers
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            New
          </h3>
          <DashboardSlider items={newSets.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            About us
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            LegoLand offers you rare Lego sets with 99% of the parts constantly
            maintained in stock at our warehouse as presented on the website.
            The assortment of the LegoLand online store includes Lego sets from
            universes such as Star Wars, Indiana Jones, Jurassic Park, City,
            Classic, Lord of the Rings, and many others.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
