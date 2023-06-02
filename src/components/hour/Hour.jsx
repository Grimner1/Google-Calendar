import React from "react";
import moment from "moment";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({
  dataHour,
  hourEvents,
  isTimeNow,
  handleChangeShowModal,
  presentDay,
}) => {
  const top = new Date().getMinutes(); // I add style for red line

  const openModal = (e) => {
    const x = e.target.closest(".event");
    if (x) {
      const id = x.dataset.id;
      handleChangeShowModal(null, id);
    } else {
      const time = `${e.target.dataset.time - 1}:00`;
      const date = moment(presentDay).format("YYYY MM DD");
      const startDate = new Date(`${date} ${time}`);

      handleChangeShowModal(startDate);
    }
  };

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={openModal}
    >
      {/*add red line*/}
      {isTimeNow && <span className="red-line" style={{ top: top }}></span>}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={
              (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
              (1000 * 60)
            }
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            openExistsModal={openModal}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Hour;
