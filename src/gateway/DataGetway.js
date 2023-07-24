const url =
  "https://61856c5523a2fe0017fff620.mockapi.io/api/GoogleCalendarEvents";

export const getDataFromServer = (id) =>
  id
    ? fetch(`${url}/${id}`)
        .then((data) => data.json())
        .catch((error) => new Error(`${error}: Error on get user data`))
    : fetch(url)
        .then((data) => data.json())
        .catch((error) => new Error(`${error}: Error on get all data`));

export const postDataToServer = (event) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(event),
  }).catch((error) => new Error(`${error}: Error on post data`));

export const putDataToServer = (id, event) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(event),
  }).catch((error) => new Error(`${error}: Error on put user data`));

export const deleteDataFromServer = (id) =>
  fetch(`${url}/${id}`, { method: "DELETE" }).catch(
    (error) => new Error(`${error}: Error on delete user data`)
  );
