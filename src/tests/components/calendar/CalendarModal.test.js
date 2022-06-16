import React from "react";
import { act } from "@testing-library/react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";
import Swal from "sweetalert2";
import {
  eventClearActiveNote,
  eventStartAddNew,
  eventStartUpdated,
} from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).second(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola perro",
      notes: "Notas",
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: "24356",
    name: "jp1",
  },
  ui: {
    modalOpen: true,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

jest.mock("../../../actions/event", () => ({
  eventStartUpdated: jest.fn(),
  eventClearActiveNote: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Pruebas en CalendarModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostar el modal", () => {
    // expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("Debe de llamar la accion de llamar y actualizar el modal", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(eventStartUpdated).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveNote).toHaveBeenCalled();
  });

  test("Debe de mostrar error si no hay titulo", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("should de crear un nuevo evento", () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "24356",
        name: "jp1",
      },
      ui: {
        modalOpen: true,
      },
    };
    let store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: { name: "title", value: "Hola perrito" },
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "Hola perrito",
      notes: "",
    });
    expect(eventClearActiveNote).toHaveBeenCalled();
  });

  test("Debe de validar las fechas", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: { name: "title", value: "Hola perrito" },
    });

    const hoy = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "La fecha fin debe ser mayor a la fecha de inicio",
      "error"
    );
  });
});
