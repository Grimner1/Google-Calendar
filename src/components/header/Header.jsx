import React from "react";
import { months } from "../../utils/dateUtils";

import "./header.scss";

const Header = ({
  weekDates,
  changeWeek,
  handleChangeShowModal,
  handleChangeSwohToday,
}) => {
  const weekStartMonth = months[weekDates[0].getMonth()];
  const weekEndMonth = months[weekDates[6].getMonth()];

  const getMonthsOnWeek = () => {
    if (weekStartMonth === weekEndMonth) {
      return `${weekStartMonth}`;
    }

    return `${weekStartMonth} - ${weekEndMonth}`;
  };

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={handleChangeShowModal}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={handleChangeSwohToday}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={(e) => changeWeek(e, false)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={(e) => changeWeek(e, true)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{getMonthsOnWeek()}</span>
      </div>
    </header>
  );
};

export default Header;
