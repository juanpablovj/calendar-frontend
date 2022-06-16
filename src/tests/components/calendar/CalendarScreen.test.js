import React from "react";
import { act } from "@testing-library/react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { eventSetActive } from "../../../actions/event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "24356",
  },
  ui: {
    modalOpen: false,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

jest.mock("../../../actions/event", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

describe("Pruebas en CalendarScreen", () => {
  test("should mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Pruebas con las interacciones del calendario", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "[ui] Open modal" });

    calendar.prop("onSelectEvent")({ start: "hoy" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "hoy" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
