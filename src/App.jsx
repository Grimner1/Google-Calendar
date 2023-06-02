import React from "react";
import { useState, useEffect } from "react";

import {
  getData,
  postData,
  putData,
  deleteData,
} from "./gateway/DataGetway.js";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";
import {
  setEventForModal,
  validationForNewEvent,
} from "../Validation/validation.js";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [state, setState] = useState({
    date: new Date(),
    events: [],
    showModal: false,
    event: {
      id: "",
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    getData().then((data) => setState({ ...state, events: data }));
  }, []);

  const weekDates = generateWeekRange(getWeekStartDate(state.date));

  const changeWeek = (e, direction) => {
    const currentDate = new Date(state.date);

    if (direction) {
      currentDate.setDate(currentDate.getDate() + 7);
    } else {
      currentDate.setDate(currentDate.getDate() - 7);
    }

    setState({ ...state, date: new Date(currentDate) });
  };

  // ========handleChange Modal

  const handleChangeShowModal = (startDate, id) => {
    setState({
      ...state,
      showModal: true,
      event: setEventForModal(startDate, id, state.events),
    });
  };

  const handleChangeHideModal = () => {
    setState({
      ...state,
      showModal: false,
    });
  };

  const handleChangeCreateButton = (e, eventData) => {
    const id = eventData.id;
    const isExistsIndex = state.events.findIndex((el) => el.id === id);

    if (isExistsIndex === -1) {
      if (
        validationForNewEvent(
          eventData.dateFrom,
          eventData.dateTo,
          state.events
        )
      ) {
        alert("Please, enter correctly time data");
        return;
      }

      postData(eventData).then(() =>
        getData().then((data) =>
          setState({ ...state, events: data, showModal: false })
        )
      );
    } else {
      putData(id, eventData).then(() =>
        getData().then((data) =>
          setState({ ...state, events: data, showModal: false })
        )
      );
    }
  };
  //============
  const handleChangeDeleteEvent = (id, date, endTime) => {
    // ====== валидация на удаление ивента за 15 мсинут до конца
    const timeNow = new Date().getTime();
    const dateTo = new Date(`${date} ${endTime}`).getTime();
    console.log((timeNow - dateTo) / 1000 / 60);
    if (
      (timeNow - dateTo) / 1000 / 60 > 0 &&
      (timeNow - dateTo) / 1000 / 60 < 15
    ) {
      return alert(
        "You cen't delene event less than 15 minutes before the start"
      );
    }
    // ======

    const copyEvents = [...state.events];

    deleteData(id).then(() =>
      getData().then((data) =>
        setState({ ...state, events: data, showModal: false })
      )
    );
  };
  //============
  const handleChangeSwohToday = () => {
    setState({ ...state, date: new Date() });
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        changeWeek={changeWeek}
        handleChangeShowModal={handleChangeShowModal}
        handleChangeSwohToday={handleChangeSwohToday}
      />
      <Calendar
        weekDates={weekDates}
        events={state.events}
        handleChangeShowModal={handleChangeShowModal}
      />
      {state.showModal && (
        <Modal
          handleChangeHideModal={handleChangeHideModal}
          handleChangeCreateButton={handleChangeCreateButton}
          event={state.event}
          handleChangeDeleteEvent={handleChangeDeleteEvent}
        />
      )}
    </>
  );
};

export default App;
