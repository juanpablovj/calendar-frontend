import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: true,
  // uid: null,
  // name: null,
};

describe("Pruebas en authReducer", () => {
  test("should de retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should de logearse", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "abs123",
        name: "jp",
      },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false, uid: 'abs123', name: 'jp' })
  });
});
