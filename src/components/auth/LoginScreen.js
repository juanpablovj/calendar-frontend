import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForms } from "../../hooks/useForms";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForms({
    loginEmail: "jp@jp.com",
    loginPassword: "123123",
  });

  const [formRegisterValues, handleRegisterInputChange] = useForms({
    registerName: "Juanito",
    registerEmail: "jp@jp2.com",
    registerPassword1: "123123",
    registerPassword2: "123123",
  });

  const { registerName, registerEmail, registerPassword1, registerPassword2 } =
    formRegisterValues;

  const { loginEmail, loginPassword } = formLoginValues;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (registerPassword1 !== registerPassword2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }

    dispatch(startRegister(registerName, registerEmail, registerPassword1));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit mb-3" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Contraseña"
                name="registerPassword1"
                value={registerPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit mb-3"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
