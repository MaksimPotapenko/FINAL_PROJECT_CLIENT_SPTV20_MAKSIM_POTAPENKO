import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createFx, deleteFx } from '@/app/api/admin'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/admin/index.module.scss'

// Header Component
const Header = () => (
  <header className={styles.header}>
    <h1>
      <img src="/img/logo.svg" alt="logo" />
      LegoLand
    </h1>
  </header>
)

// Footer Component
const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; 2024 LegoLand. All rights reserved.</p>
  </footer>
)

const AdminPage = () => {
  type FormData = {
    theme: string
    price: number
    name: string
    description: string
    images: string[]
    in_stock: number
  }

  const [activeTab, setActiveTab] = useState('create') // 'create' или 'delete'
  const [, setSpinner] = useState(false)
  const { register, handleSubmit, reset: resetForm } = useForm<FormData>()
  const {
    register: registerId,
    handleSubmit: handleSubmitId,
    reset: resetIdForm,
  } = useForm<{ id: string }>()

  const onSubmit = async (data: FormData) => {
    try {
      setSpinner(true)
      const userData = await createFx({
        url: '/lego-sets/create',
        theme: data.theme,
        price: data.price,
        name: data.name,
        description: data.description,
        images: data.images,
        in_stock: data.in_stock,
      })

      if (!userData) {
        return
      }

      resetForm()
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  const handleDelete = async (data: { id: string }) => {
    try {
      setSpinner(true)
      await deleteFx(data.id)
      // Дополнительная логика, например, обновление списка наборов после удаления
      resetIdForm()
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.tabs}>
          <button
            className={activeTab === 'create' ? styles.activeTab : ''}
            onClick={() => setActiveTab('create')}
          >
            Create Set
          </button>
          <button
            className={activeTab === 'delete' ? styles.activeTab : ''}
            onClick={() => setActiveTab('delete')}
          >
            Delete Set
          </button>
        </div>
        {activeTab === 'create' && (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label>Theme</label>
              <input {...register('theme')} />
            </div>

            <div className={styles.formGroup}>
              <label>Price</label>
              <input {...register('price', { valueAsNumber: true })} />
            </div>

            <div className={styles.formGroup}>
              <label>Name</label>
              <input {...register('name')} />
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea {...register('description')} />
            </div>

            <div className={styles.formGroup}>
              <label>Images</label>
              <input {...register('images')} />
            </div>

            <div className={styles.formGroup}>
              <label>In stock</label>
              <input {...register('in_stock', { valueAsNumber: true })} />
            </div>

            <div className={styles.formGroup}>
              <input className={styles.submitButton} type="submit" />
            </div>
          </form>
        )}
        {activeTab === 'delete' && (
          <form onSubmit={handleSubmitId(handleDelete)}>
            <div className={styles.formGroup}>
              <label>ID to delete</label>
              <input {...registerId('id')} />
            </div>
            <div className={styles.formGroup}>
              <input className={styles.submitButton} type="submit" />
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default AdminPage
