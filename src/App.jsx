import React from "react";
import { useState, useEffect } from "react";
import { getDataFromServer } from "./gateway/DataGetway.js";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [state, setState] = useState({
    date: new Date(),
    events: [],
    showModal: false,
    startDataForModalInput: {
      eventId: null,
      startDataForNewEvent: null,
    },
  });

  useEffect(() => {
    getDataFromServer().then((data) => setState({ ...state, events: data }));
  }, [state.showModal]);

  const weekDates = generateWeekRange(getWeekStartDate(state.date));

  const handleChangeWeekOneAhead = () => {
    const currentDate = new Date(state.date);
    currentDate.setDate(currentDate.getDate() + 7);
    setState({ ...state, date: new Date(currentDate) });
  };

  const handleChangeWeekOneBack = () => {
    const currentDate = new Date(state.date);
    currentDate.setDate(currentDate.getDate() - 7);
    setState({ ...state, date: new Date(currentDate) });
  };

  const handleChangeShowModal = (startDate, id) => {
    setState({
      ...state,
      showModal: true,
      startDataForModalInput: {
        eventId: id,
        startDataForNewEvent: startDate,
      },
    });
  };

  const handleChangeHideModal = () => {
    setState({
      ...state,
      showModal: false,
    });
  };

  const handleChangeShowToday = () => {
    setState({ ...state, date: new Date() });
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        handleChangeWeekOneAhead={handleChangeWeekOneAhead}
        handleChangeWeekOneBack={handleChangeWeekOneBack}
        handleChangeShowModal={handleChangeShowModal}
        handleChangeShowToday={handleChangeShowToday}
      />
      <Calendar
        weekDates={weekDates}
        events={state.events}
        handleChangeShowModal={handleChangeShowModal}
      />
      {state.showModal && (
        <Modal
          handleChangeHideModal={handleChangeHideModal}
          startDataForModalInput={state.startDataForModalInput}
          events={state.events}
        />
      )}
    </>
  );
};

export default App;
