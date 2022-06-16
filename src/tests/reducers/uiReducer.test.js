import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};

describe("Pruebas en uiReducer", () => {
  test("should de retornar el estado por defecto", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should de abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    expect(state).toEqual({ modalOpen: true });
    const modalClose = uiCloseModal();
    const stateClose = uiReducer(initialState, modalClose);
    expect(stateClose).toEqual({ modalOpen:false });
  });
});
