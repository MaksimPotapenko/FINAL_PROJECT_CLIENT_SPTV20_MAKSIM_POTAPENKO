import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from '@/types/auth'

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('name', {
        required: 'Enter name!',
        minLength: 2,
        maxLength: 15,
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Invalid value!',
        },
      })}
      className={styles.form__input}
      type="text"
      placeholder="Name"
    />
    {errors.name && (
      <span className={styles.error_alert}>{errors.name?.message}</span>
    )}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Min 2 symbols!</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Max 15 symbols!</span>
    )}
  </label>
)

export default NameInput
