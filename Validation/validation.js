import moment from "moment";

export const setEventForModal = (startDate, id, events) => {
  const event = {
    id: "",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  };

  if (!isNaN(Date.parse(startDate))) {
    event.date = moment(startDate).format("YYYY-MM-DD");
    event.startTime = moment(startDate).format("HH:mm");

    return event;
  } else if (id) {
    const findEvent = events.filter((event) => event.id == id);
    const event = findEvent[0];

    (event.id = event.id),
      (event.title = event.title),
      (event.description = event.description),
      (event.date = moment(event.dateFrom).format("YYYY-MM-DD"));
    event.startTime = moment(event.dateFrom).format("HH:mm");
    event.endTime = moment(event.dateTo).format("HH:mm");

    return event;
  } else {
    return event;
  }
};

export const validationForNewEvent = (dateFrom, dateTo, events) => {
  if (dateFrom > dateTo) {
    return true;
  }
  console.log();
  const dayStart = new Date(moment(new Date(dateFrom)).format("YYYY.MM.DD"));
  const dayEnd = new Date(dayStart.getTime()).setHours(
    dayStart.getHours() + 24
  );

  const dayEvent = events.filter(
    (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
  );
  //мы получили ивенты на день
  //проверяем, нет ли пересечения по времени
  let crossing = false;
  const isTimeCrossing = dayEvent.forEach((event) => {
    const x =
      (dateFrom < event.dateFrom && dateTo < event.dateFrom) ||
      (dateFrom > event.dateTo && dateTo > event.dateTo);

    if (!x) {
      crossing = true;
    }
  });
  return crossing;
};
