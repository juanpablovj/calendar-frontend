import React from "react";
import { useDispatch } from "react-redux";
import { eventClearActiveNote } from "../../actions/event";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(eventClearActiveNote());
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};
