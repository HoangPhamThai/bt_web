import ListPerson from "./list_person.js";
import {
  getValueById,
  showElement,
  hideElement,
  getAllInputFields,
  renderListPerson,
} from "./controller.js";
import * as constants from "../constants/constant.js";
import { validate } from "./validate.js";

var listPersonObject;

const init = () => {
  listPersonObject = new ListPerson();

  listPersonObject.getAllPerson();

  addClickListenerAddPersonBtn();
  addClickListenerSortNameBtn(listPersonObject);
};

const addClickListenerAddPersonBtn = () => {
  document.getElementById("add-person-btn").addEventListener("click", () => {
    $("#personModal").modal("show");
  });
};

const addClickListenerSortNameBtn = (listPersonObject) => {
  document.getElementById("name-inc-btn").addEventListener("click", () => {
    listPersonObject.sortByName(true);
  });
  document.getElementById("name-dec-btn").addEventListener("click", () => {
    listPersonObject.sortByName(false);
  });
};

window.createNewPerson = () => {
  const formElements = getAllInputFields("person-form");

  let person = {};

  formElements.forEach((element) => {
    if (element.value !== "") {
      person[element.name] = element.value;
    }
  });

  if (validate(person)) {
    listPersonObject.createNewPerson(person);
  }
};

window.changeType = () => {
  let type = getValueById("person-type");
  switch (type) {
    case constants.typeStudent:
      showElement("studentInfo");
      hideElement("employeeInfo");
      hideElement("customerInfo");
      break;
    case constants.typeEmployee:
      showElement("employeeInfo");
      hideElement("studentInfo");
      hideElement("customerInfo");
      break;
    case constants.typeCustomer:
      showElement("customerInfo");
      hideElement("employeeInfo");
      hideElement("studentInfo");
      break;
  }
};

window.updatePerson = () => {
  const formElements = getAllInputFields("person-form");

  let person = {};

  formElements.forEach((element) => {
    if (element.value !== "") {
      person[element.name] = element.value;
    }
  });

  if (validate(person)) {
    listPersonObject.updatePerson(person);
  }
};

window.filterPersonByType = () => {
  let type = getValueById("sort-person-type");
  listPersonObject.filterByType(type);
  renderListPerson(listPersonObject);
};

init();
