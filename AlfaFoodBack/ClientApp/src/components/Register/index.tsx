import React, {useCallback} from "react";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { InjectedFormProps, reduxForm, Field } from "redux-form";



import useDocumentTitle from "../../hooks/useDocumentTitle";
import { register } from "../../redux/reducers/authReducer";
import { required } from "../../utils/validators";
import normalizePhone from "../../utils/normalize";


import "./index.scss";

type RegisterFormOwnProps = {
  onSubmit: (data: any) => void;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}: any) => (
  <div className="register__form-field">
    {/* <label>{label}</label> */}
    <div>
      <input
          {...input}
          placeholder={label}
          type={type}
          className="register__input"
      />
      {touched &&
        ((error && <div className="register__error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const RegisterForm: React.FC<
  InjectedFormProps<RegisterFormValuesType, RegisterFormOwnProps> &
    RegisterFormOwnProps
> = (props) => {
  const { pristine, submitting, handleSubmit, onSubmit } = props;
  const history = useHistory()

  const historyGoBackCB = useCallback(() => {
    history.back()
  }, [])


  return (
    <div className="register__form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Field
              name="username"
              component={renderField}
              type="text"
              validate={[required]}
              label="Имя и Фамилия"
            />
          </div>
        </div>

        {/* <label htmlFor="phone">Телефон</label> */}
        <Field
          label={"Телефон"}
          name="phone"
          component={renderField}
          type="text"
          validate={[required]}
          normalize={normalizePhone}
        />

        {/* <label htmlFor="email">Почта</label> */}
        <Field
          name="email"
          component={renderField}
          type="text"
          validate={[required]}
          label="Email"
        />

        {/* <label htmlFor="password">Пароль</label> */}
        <Field
          name="password"
          placeholder="Пароль"
          component={renderField}
          type="text"
          validate={[required]}
          label="Пароль"
        />
        <div>
          <button
              className="register__btn register__primary-btn"
              type="submit"
              disabled={pristine || submitting}
          >
            Зарегистрироваться
          </button>
        </div>
        <div>
          <button
              onClick={historyGoBackCB}
              className="register__btn register__secondary-btn"
          >НАЗАД</button>
        </div>

      </form>
    </div>
  );
};

type RegisterFormValuesType = {
  username: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterReduxForm = reduxForm<
  RegisterFormValuesType,
  RegisterFormOwnProps
>({ form: "registerForm" })(RegisterForm);

const Register: React.FC = () => {
  useDocumentTitle("Регистрация");

  const dispatch = useDispatch();

  const onSubmit = (data: RegisterFormValuesType) => {
    dispatch(register(data.email, data.password, data.phone, data.username));
  };

  return (
    <>
      <div className="vertical-center">
        <RegisterReduxForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Register;
