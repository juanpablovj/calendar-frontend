import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { AppRouter } from "../../router/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Pruebas en AppRouter", () => {
  test("should de mostar el Espere...", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h5").exists()).toBe(true);
  });

  test("should de mostar la ruta publica", () => {
    const initState = {
      auth: {
        checking: false,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("should de mostar la ruta privada", () => {
    const initState = {
      auth: {
        checking: false,
        uid: "abc123",
        name: "jp1",
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: false,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
