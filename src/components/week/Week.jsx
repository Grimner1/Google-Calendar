import React from "react";
import propTypes from "prop-types";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates, events, handleChangeShowModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            day={dayStart}
            handleChangeShowModal={handleChangeShowModal}
          />
        );
      })}
    </div>
  );
};

export default Week;

Week.propTypes = {
  weekDates: propTypes.array.isRequired,
  events: propTypes.array.isRequired,
  handleChangeShowModal: propTypes.func.isRequired,
};
