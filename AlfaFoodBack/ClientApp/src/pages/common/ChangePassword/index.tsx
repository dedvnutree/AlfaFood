import React from "react"
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { required} from "../../../utils/validators";


import "./index.scss"





const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }: any) => (
    <div>
        <div className="changePassword__field">
            <input
                {...input}
                placeholder={label}
                type={type}
                className="changePassword__input"
            />
            {touched &&
            ((error && <span className="changePassword__error">{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

type ChangePasswordFormValuesType = {
    oldPassword: string,
    newPassword: string,
    repeatPassword: string
}


const ChangePasswordForm: React.FC<InjectedFormProps<ChangePasswordFormValuesType, ChangePasswordOwnProps>  & ChangePasswordOwnProps> = (props) => {
    const { pristine, submitting, handleSubmit, onSubmit} = props;

    return (
        <div className="changePassword__form">
            <h3>Изменить пароль</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Field
                        placeholder="Старый пароль"
                        name="oldPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        placeholder="Новый пароль"
                        name="newPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        placeholder="Повторите пароль"
                        name="repeatPassword"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <button
                    className="changePassword__btn"
                    type="submit"
                    disabled={pristine || submitting}
                >Изменить</button>
            </form>
        </div>
    )

}

type ChangePasswordOwnProps = {
    onSubmit: ( data: ChangePasswordFormValuesType) => void,
    formName: string
}



const FormContainer = ({formName, onSubmit} : any) => {
    //@ts-ignore
    const ChangePasswordReduxForm = reduxForm<ChangePasswordFormValuesType, ChangePasswordOwnProps>({form: formName})(ChangePasswordForm)
    return (
        //@ts-ignore
        <ChangePasswordReduxForm onSubmit={onSubmit} />
    )
}

export default FormContainer