import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/event";

export const DeleteEventFab = () => {
  
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventStartDelete())
    }
  
    return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash" />
      <span> Borrar Evento</span>
    </button>
  );
};
