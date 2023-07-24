import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import propTypes from "prop-types";

import "./modal.scss";

import {
  postDataToServer,
  putDataToServer,
  deleteDataFromServer,
} from "../../gateway/DataGetway";

const Modal = ({ handleChangeHideModal, startDataForModalInput, events }) => {
  const [inputData, setInputData] = useState({
    idField: "",
    titleField: "",
    descriptionField: "",
    dateField: "",
    startTimeField: "",
    endTimeField: "",
  });

  const { eventId, startDataForNewEvent } = startDataForModalInput;

  useEffect(() => {
    setInputData(startDateForInput());
  }, []);

  const startDateForInput = () => {
    const event = {
      idField: "",
      titleField: "",
      descriptionField: "",
      dateField: "",
      startTimeField: "",
      endTimeField: "",
    };

    if (!isNaN(Date.parse(startDataForNewEvent))) {
      event.dateField = moment(startDataForNewEvent).format("YYYY-MM-DD");
      event.startTimeField = moment(startDataForNewEvent).format("HH:mm");

      return event;
    } else if (eventId) {
      const findEvent = events.filter((event) => event.id == eventId);
      const event = findEvent[0];

      event.idField = event.id;
      event.titleField = event.title;
      event.descriptionField = event.description;
      event.dateField = moment(event.dateFrom).format("YYYY-MM-DD");
      event.startTimeField = moment(event.dateFrom).format("HH:mm");
      event.endTimeField = moment(event.dateTo).format("HH:mm");

      return event;
    } else {
      return event;
    }
  };

  const handleChangeSendInputFieldsData = (event) => {
    event.preventDefault();

    const formFields = document.getElementsByClassName("event-form");

    const inputsData = getEventData(formFields[0]);

    if (inputsData == undefined) {
      return;
    }

    const isExistsIndex = events.findIndex((el) => el.id === inputsData.id);

    if (isExistsIndex === -1) {
      if (
        validationForNewEventCrossingDate(
          inputsData.dateFrom,
          inputsData.dateTo,
          events
        )
      ) {
        alert("Please, enter correctly time data");
        return;
      }

      postDataToServer(inputsData).then(() => handleChangeHideModal());
    } else {
      putDataToServer(inputData.idField, inputsData).then(() =>
        handleChangeHideModal()
      );
    }
  };

  const handleChangeDeleteEvent = (event) => {
    event.preventDefault();
    const timeNow = new Date().getTime();
    const dateTo = new Date(
      `${inputData.dateField} ${inputData.endTimeField}`
    ).getTime();

    if (
      (timeNow - dateTo) / 1000 / 60 > 0 &&
      (timeNow - dateTo) / 1000 / 60 < 15
    ) {
      return alert(
        "You cen't delete event less than 15 minutes before the start"
      );
    }

    deleteDataFromServer(inputData.idField).then(() => handleChangeHideModal());
  };

  const getEventData = (event) => {
    const newEvent = new FormData(event);
    const date = moment(newEvent.get("date")).format("YYYY MM DD");
    const eventData = {
      id: inputData.idField,
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
    } else {
      return alert("Please, enter min 00, 15, 30 or 45");
    }
  };

  const validationForNewEventCrossingDate = (dateFrom, dateTo, events) => {
    if (dateFrom > dateTo) {
      return true;
    }

    const dayStart = new Date(moment(new Date(dateFrom)).format("YYYY.MM.DD"));
    const dayEnd = new Date(dayStart.getTime()).setHours(
      dayStart.getHours() + 24
    );

    const dayEvent = events.filter(
      (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
    );

    let crossing = false;
    const isTimeCrossing = dayEvent.forEach((event) => {
      const x =
        (dateFrom < event.dateFrom && dateTo < event.dateFrom) ||
        (dateFrom > event.dateTo && dateTo > event.dateTo);
      console.log(!x);
      if (!x) {
        crossing = true;
      }
    });
    return crossing;
  };

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
              defaultValue={inputData.titleField}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                required
                defaultValue={inputData.dateField}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                required
                defaultValue={inputData.startTimeField}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                required
                defaultValue={inputData.endTimeField}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              defaultValue={inputData.descriptionField}
            ></textarea>
            <div className="event-form__event_btns">
              {inputData.idField && (
                <button
                  className="event-form__delete-btn"
                  onClick={handleChangeDeleteEvent}
                >
                  Delete
                </button>
              )}

              {inputData.idField ? (
                <button
                  type="submit"
                  className="event-form__submit-btn"
                  onClick={handleChangeSendInputFieldsData}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  className="event-form__submit-btn"
                  onClick={handleChangeSendInputFieldsData}
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
  startDataForModalInput: propTypes.object.isRequired,
  events: propTypes.array.isRequired,
};
