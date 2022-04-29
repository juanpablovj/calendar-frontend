import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogout } from "../../actions/event";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(eventLogout())
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand mx-4">{name}</span>

      <button className="btn btn-outline-danger mx-4" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" />
        <span> Salir</span>
      </button>
    </div>
  );
};
