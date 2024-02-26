import EmailInput from '@/components/elements/AuthPage/EmailInput'
import NameInput from '@/components/elements/AuthPage/NameInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import styles from '@/styles/auth/index.module.scss'
import { IInputs } from '@/types/auth'
import { useForm } from 'react-hook-form'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
    const { register, formState: { errors }, handleSubmit, resetField } = useForm<IInputs>()
    
    const onSubmit = (data: IInputs) => {
        console.log(data)
        resetField('name')
        resetField('email')
        resetField('password')
        switchForm
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={`${styles.form__title} ${styles.title}`}>
                Create Account
            </h2>
            <NameInput register={register} errors={errors}/>
            <EmailInput register={register} errors={errors}/>
            <PasswordInput register={register} errors={errors}/>
            <button 
            className={`${styles.form__button} ${styles.button} ${styles.submit}`}
            >
                SIGN UP
            </button>
            </form>
    )
}

export default SignUpForm