import React from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  eventClearActiveNote,
  eventStartAddNew,
  eventStartUpdated,
} from "../../actions/event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

const now = moment().minutes(0).second(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initialEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = React.useState(now.toDate());
  const [dateFinish, setDateFinish] = React.useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = React.useState(true);
  const [formValues, setFormValues] = React.useState(initialEvent);

  const { notes, title, start, end } = formValues;

  React.useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialEvent);
    }
  }, [activeEvent]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveNote());
    setFormValues(initialEvent);
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };

  const handleFinishDateChange = (e) => {
    setDateFinish(e);
    setFormValues({ ...formValues, end: e });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
      return;
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdated(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      ariaHideApp={process.env.NODE_ENV !== 'test'}
    >
      <h1>{activeEvent ? "Editar Evento" : "Nuevo Evento"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={activeEvent ? activeEvent.start : dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleFinishDateChange}
            value={activeEvent ? activeEvent.end : dateFinish}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
