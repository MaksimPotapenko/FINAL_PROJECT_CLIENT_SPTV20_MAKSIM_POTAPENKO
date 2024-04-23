import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('password', {
        required: 'Enter password!',
        minLength: 4,
        maxLength: 20,
      })}
      className={styles.form__input}
      type="password"
      placeholder="Password"
    />
    {errors.password && (
      <span className={styles.error_alert}>{errors.password?.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>Min 4 symbols!</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>Max 20 symbols!</span>
    )}
  </label>
)

export default PasswordInput
