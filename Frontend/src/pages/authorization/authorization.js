import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import H2 from "../../components/h2/h2";
import { useResetForm } from "../../hooks";
import styled from "styled-components";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants/role";
import { request } from "../../utils";

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const ErrorMessageDiv = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  animation: myAnim 1.5s ease 0s 1 normal forwards;

  @keyframes myAnim {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }

    % {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Пустой логин")
    .matches(/\w+$/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(/^[\w#%]+$/, "Допускаются только буквы, цифры и символы")
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
});
const AuthorizationContainer = ({ className }) => {
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
    },
    resolver: yupResolver(authFormSchema),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [serverError, setServerError] = useState();
  const roleId = useSelector(selectUserRole);

  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", {login, password}).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса ${error}`);
        return;
      }
      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
      setServerError(null);
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={className}>
        <H2>Авторизация</H2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Login"
            {...register("login", {
              onChange: () => setServerError(null),
            })}
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password", {
              onChange: () => setServerError(null),
            })}
          ></Input>
          <Button
            type="submit"
            disabled={!!formError}
            children={"Авторизоваться"}
          ></Button>
          {errorMessage && <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>}
          <StyledLink to="/register">Регистрация</StyledLink>
        </form>
      </div>
    </>
  );
};

export const Authorization = styled(AuthorizationContainer)`
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
