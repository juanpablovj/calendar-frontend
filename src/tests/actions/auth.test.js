import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

// jest.mock("sweetalert2", () => ({
//   fire: jest.fn(),
// }));

Swal.fire = jest.fn(); //Es lo mismo que arriba

let token = "";

describe("Pruebas en las acciones en el auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correcto", async () => {
    await store.dispatch(startLogin("jp@jp1.com", "123123"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1])
  });

  test("startLogin incorrecto", async () => {
    await store.dispatch(startLogin("jp@jp1.com", "123124"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Invalid password",
      " error"
    );

    await store.dispatch(startLogin("jp@jp4567.com", "123123"));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Usuario y contraseña incorrectos",
      " error"
    );
  });

  test("startRegister correcto", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "Test",
          token: "abcabc123123",
        };
      },
    }));
    await store.dispatch(startRegister("test", "test@test1.com", "123123"));

    let actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: 123, name: "Test" },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abcabc123123");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "Test",
          token: "abcabc123123",
        };
      },
    }));
    await store.dispatch(startChecking());

    let actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: 123, name: "Test" },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abcabc123123");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });
});
