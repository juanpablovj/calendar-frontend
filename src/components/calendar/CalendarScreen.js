import React from "react";
import moment from "moment";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActiveNote,
  eventSetActive,
  eventStartLoading,
} from "../../actions/event";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = React.useState(
    localStorage.getItem("lastView") || "month"
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSeclected) => {
    
    const style = {
      backgroundColor: uid === event.user._id ? "#367cf7" : '#461257',
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "#fff",
    };

    return { style };
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveNote());
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};
