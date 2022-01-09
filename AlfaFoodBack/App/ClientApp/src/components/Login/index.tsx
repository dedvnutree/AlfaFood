import React from 'react'
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {InjectedFormProps, reduxForm, Field, SubmissionError} from "redux-form"
import { required } from "../../utils/validators";

import {actions, login} from '../../redux/reducers/authReducer'

import "./index.scss"

import { useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import {authAPI} from "../../api/auth-api";

type LoginFormOwnProps = {
    onSubmit: (data: LoginFormValuesType) => void
}

const renderField = ({
                         input,
                         placeholder,
                         type,
                         meta: { touched, error, warning }
                     }: any) => (
    <div>
        <div className="login__form-field">
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                className="login__input"
            />
            {touched &&
            ((error && <span className="login__error">{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>  & LoginFormOwnProps> = (props) => {

    const {error, pristine, submitting, handleSubmit, onSubmit} = props;
    return (
        <div className="login__form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Field
                        placeholder="Почта"
                        name="email"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div>
                    <Field
                        placeholder="Пароль"
                        name="password"
                        component={renderField}
                        type="text"
                        validate={[required]}
                    />
                </div>
                <div className="login__error-wrap">{error && <span> {error}</span>}</div>
                <div className="login__btn-wrap">
                    <button
                        className="login__btn login__primary-btn"
                        type="submit"
                        disabled={pristine || submitting}
                    >ВОЙТИ</button>
                </div>
                <div className="login__btn-wrap">
                    <NavLink
                        to="/register"
                        style={{textDecoration: "none", color: "black"}}

                    >
                        <button
                            className="login__btn login__secondary-btn"
                        >
                            Зарегистрироваться
                        </button>

                    </NavLink>
                </div>

            </form>
        </div>
    )
}

export type LoginFormValuesType = {
    email: string
    password: string,
}

// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

//@ts-ignore
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "loginForm"})(LoginForm)


const LoginPage: React.FC = () => {

    useDocumentTitle("Вход")

    const dispatch = useDispatch()
    const history = useHistory()


    const onSubmit = async (data: LoginFormValuesType) => {
        let { email, password} = data
        await dispatch(login(email, password))
        history.push('/')
        // try {
        //     let loggedInUser = await authAPI.login(email,password)
        //     console.log('loggedInUserwewwewewe')
        //     if (loggedInUser) {
        //         await dispatch(actions.setAuthUserData(loggedInUser))
        //     }
        // } catch(e) {
        //     throw new SubmissionError(e)
        //     console.log('error in login')
        // }
    }

    return (
        <div
            className="vertical-center"
        >
            <div
                className="login-container"
            >
                <LoginReduxForm onSubmit={onSubmit} />
            </div>

        </div>

    )
}

export default LoginPage