import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import propTypes from "prop-types";

import "./modal.scss";

const Modal = ({
  handleChangeHideModal,
  handleChangeCreateButton,
  event,
  handleChangeDeleteEvent,
}) => {
  const { id, title, description, date, startTime, endTime } = event;

  const prepearDelete = (event, id) => {
    event.preventDefault();
    handleChangeDeleteEvent(id, date, endTime);
  };

  const sendEventData = (event) => {
    event.preventDefault();
    const formFields = document.getElementsByClassName("event-form");
    handleChangeCreateButton(event, getEventData(formFields[0]));
  };

  const getEventData = (event) => {
    const newEvent = new FormData(event);
    const date = moment(newEvent.get("date")).format("YYYY MM DD");
    const eventData = {
      id: id,
      title: newEvent.get("title"),
      description: newEvent.get("description"),
      dateFrom: new Date(`${date} ${newEvent.get("startTime")}`).getTime(),
      dateTo: new Date(`${date} ${newEvent.get("endTime")}`).getTime(),
    };

    const durationEvent =
      (eventData.dateTo - eventData.dateFrom) / 1000 / 60 / 60;

    if (durationEvent > 6) {
      return alert("The duration of the event must not be more than 6 hours");
    }

    const minStart = moment(eventData.dateFrom).format("mm");
    const minEnd = moment(eventData.dateTo).format("mm");

    if (
      (minStart == "00" ||
        minStart == "15" ||
        minStart == "30" ||
        minStart == "45") &&
      (minEnd == "00" || minEnd == "15" || minEnd == "30" || minEnd == "45")
    ) {
      return eventData;
    }

    alert("Please, enter min 00, 15, 30 or 45");
  };

  console.log(state);

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={handleChangeHideModal}
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              required
              defaultValue={title}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                required
                defaultValue={date}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                required
                defaultValue={startTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                required
                defaultValue={endTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              defaultValue={description}
            ></textarea>
            <div className="event-form__event_btns">
              {id && (
                <button
                  className="event-form__delete-btn"
                  onClick={(e) => prepearDelete(e, id)}
                >
                  Delete
                </button>
              )}

              {id ? (
                <button
                  type="submit"
                  className="event-form__submit-btn"
                  onClick={sendEventData}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className="event-form__submit-btn"
                  onClick={sendEventData}
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  handleChangeHideModal: propTypes.func.isRequired,
  handleChangeCreateButton: propTypes.func.isRequired,
  event: propTypes.object.isRequired,
  handleChangeDeleteEvent: propTypes.func.isRequired,
};
