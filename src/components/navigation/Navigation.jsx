import React from "react";
import ClassNames from "classnames";
import moment from "moment";
import "./navigation.scss";

import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate, index) => {
        const isToday = () =>
          moment(dayDate).format("LL") === moment(new Date()).format("LL");

        const listItemClasses = ClassNames("day-label__day-number", {
          "day-label__today": isToday(),
        });
        // Create key from index
        return (
          <div className="calendar__day-label day-label" key={index}>
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            {/* <span className="day-label__day-number">{dayDate.getDate()}</span> */}
            <span className={listItemClasses}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
