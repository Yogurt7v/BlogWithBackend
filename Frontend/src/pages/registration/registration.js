import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import H2 from "../../components/h2/h2";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import AuthFormError from "../../components/auth-form-error/auth-error";
import {useResetForm} from "../../hooks";
import styled from "styled-components";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants/role";
import { request } from "../../utils";



const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/\w+$/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(/^[\w#%]+$/, "Допускаются только буквы, цифры и символы")
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
  passcheck: yup
    .string()
    .required("Пустой пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать!"),
});


const RegistrationContainer = ({ className }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [serverError, setServerError] = useState();

  const roleId = useSelector(selectUserRole);

  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/register", "POST", {login, password}).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса ${error}`);
        return;
      }
      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={className}>
        <H2>Регистрация</H2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Логин"
            {...register("login", {
                onChange: () => setServerError(null),
            })}
          ></Input>
          <Input
            type="password"
            placeholder="Пароль"
            autoComplete="on"
            {...register("password", {
                onChange: () => setServerError(null),
            })}
          ></Input>
          <Input
            type="password"
            placeholder="Повтор пароля"
            autoComplete="on"
            {...register("passcheck", {
                onChange: () => setServerError(null),
            })}
          ></Input>
          <Button
            type="submit"
            disabled={!!formError}
            children={"Зарегистрироваться"}
          ></Button>
          {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        </form>
      </div>
    </>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  allign-items: center;
  width: 300px;
  margin: 0 auto;

  & > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & > form > input {
    height: 30px;
  }
  & > form > button {
    height: 30px;
    cursor: pointer;
    background-color: #e6baa3;
    border: none;
    border-radius: 5px;
    justify-content: center;
    color: black;
    font-size: 12px;
    font-weight: 700;
  }
`;
