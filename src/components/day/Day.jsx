import React from "react";
import propTypes from "prop-types";
import Hour from "../hour/Hour";
import { isToday } from "../../utils/dateUtils";

import "./day.scss";

const Day = ({ dataDay, dayEvents, day, handleChangeShowModal }) => {
  const today = isToday(day) ? new Date().getHours() : false;

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            today={today}
            isTimeNow={hour === today}
            handleChangeShowModal={handleChangeShowModal}
            presentDay={day}
          />
        );
      })}
    </div>
  );
};

export default Day;

Day.propTypes = {
  dataDay: propTypes.number,
  dayEvents: propTypes.array,
  day: propTypes.instanceOf(Date),
  handleChangeShowModal: propTypes.func.isRequired,
};
