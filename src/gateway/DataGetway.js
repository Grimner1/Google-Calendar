const url =
  "https://61856c5523a2fe0017fff620.mockapi.io/api/GoogleCalendarEvents";

export const getData = (id) =>
  id
    ? fetch(`${url}/${id}`).then((data) => data.json())
    : fetch(url).then((data) => data.json());

export const postData = (event) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(event),
  });

export const putData = (id, event) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(event),
  });

export const deleteData = (id) => fetch(`${url}/${id}`, { method: "DELETE" });

// getData().then((data) => console.log(data));
// deleteData(1);
