// const inputAddTask = document.querySelector(".main-content__new-task");
// const btnAddTask = document.querySelector(".main-content__add-task");
// const ul = document.querySelector(".main-content__task-list");
// //************************************************************* */

// //create the element for the task
// const createTask = function () {
//   const li = document.createElement("li");
//   const inputTask = document.createElement("input");
//   inputTask.type = "text";
//   inputTask.value = inputAddTask.value;
//   inputAddTask.value = "";
//   const taskDone = document.createElement("input");
//   taskDone.type = "checkbox";
//   const btnDelete = document.createElement("input");
//   btnDelete.type = "button";
//   btnDelete.value = "Delete task";
//   ul.append(li);
//   li.append(taskDone, inputTask, btnDelete);
//   postApiRequest({ description: inputTask.value, done: false });
//   inputTask.disabled = true;
// };
// btnAddTask.addEventListener("click", createTask);
// //*************************************************** //

// //Delete de task
// const deleteTask = function () {
//   document.body.addEventListener(
//     "click",
//     function (e) {
//       if (e.target.type == "button") {
//         const btnDelete = document.querySelectorAll("input[type=button]");
//         btnDelete.forEach((element) => {
//           element.addEventListener("click", () => {
//             if (e) {
//             }
//             deleteApiRequest(ID);
//             element.parentElement.remove();
//           });
//         });
//       }
//     },
//     true
//   );
// };
// deleteTask();
// //******************************************************//

// //Make a task complete
// const makeTaskComplete = function () {
//   document.body.addEventListener("click", function (e) {
//     if (e.target.type == "checkbox") {
//       e.target.nextSibling.classList.toggle("finish-task");
//     }
//   });
// };
// makeTaskComplete();

// //*****************************************************//

// //Change the task
// const changeTask = function () {
//   document.body.addEventListener("click", function (e) {
//     if (e.target.disabled == true) {
//       e.target.disabled = false;
//     }
//   });
//   document.body.addEventListener("change", function (e) {
//     if (
//       e.target.disabled == false &&
//       e.target.type !== "checkbox" &&
//       e.target.id !== "new-task"
//     ) {
//       e.target.disabled = true;
//     }
//   });
// };
// changeTask();

// //*******************************************************//

//test with api

const inputAddTask = document.querySelector(".main-content__new-task");
const btnAddTask = document.querySelector(".main-content__add-task");
const ul = document.querySelector(".main-content__task-list");
//************************************************************* */
// async function getRecuest() {
//   const data = await getApiRequest();
//   data.forEach((element) => console.log(element._id));
// }
// getRecuest();
//************************************************************* */

//create the element for the task
const createTask = function () {
  const li = document.createElement("li");
  const inputTask = document.createElement("input");
  inputTask.type = "text";
  inputTask.value = inputAddTask.value;
  inputAddTask.value = "";
  const taskDone = document.createElement("input");
  taskDone.type = "checkbox";
  const btnDelete = document.createElement("input");
  btnDelete.type = "button";
  btnDelete.value = "Delete task";
  ul.append(li);
  li.append(taskDone, inputTask, btnDelete);
  postApiRequest({ description: inputTask.value, done: false });
  inputTask.disabled = true;
};
btnAddTask.addEventListener("click", createTask);
//*************************************************** //

//Delete de task
const deleteTask = function () {
  document.body.addEventListener(
    "click",
    async function (e) {
      if (e.target.type == "button") {
        const dataApi = await getApiRequest();
        for (let i = 0; i < dataApi.length; i++) {
          if (
            e.target.previousElementSibling.value == dataApi[i].description ||
            e.target.previousElementSibling.value !== dataApi[i].description //modification that I need to check later
          ) {
            deleteApiRequest(dataApi[i]._id);
            e.target.parentElement.remove();
            break;
          }
        }
      }
    },
    true
  );
};
deleteTask();
//******************************************************//

//Make a task complete
const makeTaskComplete = function () {
  document.body.addEventListener("click", async function (e) {
    console.log();
    if (e.target.type == "checkbox") {
      e.target.nextSibling.classList.toggle("finish-task");
      const dataApi = await getApiRequest();
      for (let i = 0; i < dataApi.length; i++) {
        if (
          e.target.checked == true &&
          dataApi[i].description == e.target.nextElementSibling.value
        ) {
          putApiRequestCheckbox(dataApi[i]._id, true);
          break;
        }
        if (
          e.target.checked == false &&
          dataApi[i].description == e.target.nextElementSibling.value
        ) {
          putApiRequestCheckbox(dataApi[i]._id, false);
          break;
        }
      }
    }
  });
};
makeTaskComplete();

//*****************************************************//

//Change the task
// const changeTask = function () {
//   document.body.addEventListener("click", function (e) {
//     if (e.target.disabled == true) {
//       e.target.disabled = false;
//     }
//   });
//   document.body.addEventListener("change", function (e) {
//     if (
//       e.target.disabled == false &&
//       e.target.type !== "checkbox" &&
//       e.target.id !== "new-task"
//     ) {
//       e.target.disabled = true;
//     }
//   });
// };
// changeTask();

//*******************************************************//
//Change the task with the api
const changeTask = function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.disabled == true) {
      e.target.disabled = false;
    }
  });
  document.body.addEventListener("change", async function (e) {
    if (
      e.target.disabled == false &&
      e.target.type !== "checkbox" &&
      e.target.id !== "new-task"
    ) {
      const textTask = document.querySelectorAll(
        "#task-list li input[type=text]"
      );
      const dataApi = await getApiRequest();
      for (let i = 0; i < dataApi.length; i++) {
        if (dataApi[i].description != textTask[i].value) {
          putApiRequest(dataApi[i]._id, textTask[i].value);
        }
        if (dataApi[i].description == textTask[i].value) {
          continue;
        }
      }
      console.log(dataApi);
      const dataApi2 = await getApiRequest();
      console.log(dataApi2);
      e.target.disabled = true;
    }
  });
};
changeTask();

//*******************************************************//

//******************************************************* */
// add all task in the DOM

// (async function () {
//   const dataApi = await getApiRequest();
//   dataApi.forEach((elem) => createTask(elem.description));
// })();

//******************************************************* */
//experiment with delete api
// const deleteTask = function () {
//   document.body.addEventListener(
//     "click",
//     async function (e) {
//       if (e.target.type == "button") {
//         const dataApi = await getApiRequest();
//         for (let i = 0; i < dataApi.length; i++) {
//           if (e.target.previousElementSibling.value == dataApi[i].description) {
//             deleteApiRequest(dataApi[i]._id);
//             e.target.parentElement.remove();
//             break;
//           }
//         }
//       }
//     },
//     true
//   );
// };
// deleteTaskE();
// deleteApiRequest("01abd913-cdc7-4de1-8c4a-4ac1594e3383");
