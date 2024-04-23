import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Phone *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="372-5555-5555"
      type="tel"
      {...register('phone', {
        required: 'Enter phone!',
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Invalid value',
        },
        minLength: 11,
        maxLength: 11,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Min 11 symbols!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Max 11 symbols!</span>
    )}
  </label>
)

export default PhoneInput
