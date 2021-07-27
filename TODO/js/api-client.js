const apiUrl = "http://localhost:3000/";

async function getApiRequest() {
  const apiData = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await apiData.json();
  return data;
}

async function postApiRequest(data) {
  const apiData = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

async function putApiRequest(ID, data) {
  const apiData = await fetch(`${apiUrl}${ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify((dataName = { description: data })),
  });
}
async function putApiRequestCheckbox(ID, doneState) {
  const apiData = await fetch(`${apiUrl}${ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify((dataName = { done: doneState })),
  });
}

async function deleteApiRequest(ID) {
  const apiData = await fetch(`${apiUrl}${ID}`, {
    method: "DELETE",
  });
}
