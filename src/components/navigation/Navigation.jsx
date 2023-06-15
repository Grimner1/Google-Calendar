import React from "react";
import propTypes from "prop-types";
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

        return (
          <div className="calendar__day-label day-label" key={index}>
            <span className="day-label__day-name">
              {days[dayDate.getDay()]}
            </span>
            <span className={listItemClasses}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;

Navigation.propTypes = {
  weekDates: propTypes.array.isRequired,
};
