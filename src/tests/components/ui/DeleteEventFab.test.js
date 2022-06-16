import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

jest.mock("../../../actions/event", () => ({
  eventStartDelete: jest.fn(),
}));

describe("Pruebas en DeleteEventFab", () => {
  test("should de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should de llamar el eventStartDelete", () => {
    wrapper.find("button").prop("onClick")();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
