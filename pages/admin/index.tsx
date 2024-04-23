import { createFx } from '@/app/api/admin'
import { IInputs } from '@/types/admin'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '@/styles/feedbackForm/index.module.scss'
import { showAuthError } from '@/utils/errors'

type FormData = {
  theme: string
  price: number
  name: string
  description: string
  images: string[]
  in_stock: number
}

const LegoSetForm = () => {
  const [, setSpinner] = useState(false)
  const { register, handleSubmit } = useForm<FormData>()
  const { resetField } = useForm<IInputs>()
  const onSubmit = async (data: IInputs) => {
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

      resetField('theme')
      resetField('price')
      resetField('name')
      resetField('description')
      resetField('images')
      resetField('in_stock')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.feedback_form__form__input}>Тема</label>
      <input
        className={styles.feedback_form__form__input}
        {...register('theme')}
      />

      <label className={styles.feedback_form__form__input}>Цена</label>
      <input
        className={styles.feedback_form__form__input}
        {...register('price', { valueAsNumber: true })}
      />

      <label className={styles.feedback_form__form__input}>Название</label>
      <input
        className={styles.feedback_form__form__input}
        {...register('name')}
      />

      <label className={styles.feedback_form__form__input}>Описание</label>
      <textarea
        className={styles.feedback_form__form__input}
        {...register('description')}
      />

      <label className={styles.feedback_form__form__input}>Изображения</label>
      <input
        className={styles.feedback_form__form__input}
        {...register('images')}
      />

      <label className={styles.feedback_form__form__input}>В наличии</label>
      <input
        className={styles.feedback_form__form__input}
        {...register('in_stock', { valueAsNumber: true })}
      />

      <input className={styles.feedback_form__form__btn} type="submit" />
    </form>
  )
}

export default LegoSetForm
