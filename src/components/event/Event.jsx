import React from "react";
import propTypes from "prop-types";

import "./event.scss";

const Event = ({ height, marginTop, title, time, id, openExistsModal }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div
      style={eventStyle}
      className="event"
      data-id={id}
      onClickCapture={openExistsModal}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;

Event.propTypes = {
  height: propTypes.number,
  marginTop: propTypes.number,
  title: propTypes.string,
  time: propTypes.string,
  id: propTypes.string,
  openExistsModal: propTypes.func,
};
