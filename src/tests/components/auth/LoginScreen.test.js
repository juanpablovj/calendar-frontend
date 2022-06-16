import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Pruebas de LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should de llamar el dispatch del login", () => {
    wrapper.find('input[name="loginEmail"]').simulate("change", {
      target: {
        name: "loginEmail",
        value: "jpcito",
      },
    });
    wrapper.find('input[name="loginPassword"]').simulate("change", {
      target: {
        name: "loginPassword",
        value: "123123",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });
    expect(startLogin).toHaveBeenCalledWith("jpcito", "123123");
  });

  test("no hay registro si las contraseñas son diferentes", () => {
    wrapper.find('input[name="registerPassword1"]').simulate("change", {
      target: {
        name: "registerPassword1",
        value: "123123",
      },
    });
    wrapper.find('input[name="registerPassword2"]').simulate("change", {
      target: {
        name: "registerPassword2",
        value: "123124",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas deben de ser iguales",
      "error"
    );
  });

  test("Registro con contraseñas iguales", () => {
    wrapper.find('input[name="registerPassword1"]').simulate("change", {
      target: {
        name: "registerPassword1",
        value: "12345",
      },
    });
    wrapper.find('input[name="registerPassword2"]').simulate("change", {
      target: {
        name: "registerPassword2",
        value: "12345",
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    expect(startRegister).toHaveBeenCalledWith(
      "Juanito",
      "jp@jp2.com",
      "12345"
    );
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
