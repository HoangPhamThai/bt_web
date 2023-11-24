import ListPerson from "./list_person.js";
import { getValueById, renderListPerson } from "./controller.js";
import * as constants from "../constants/constant.js";

var listPersonObject;
init();

function init() {
  listPersonObject = new ListPerson();

  listPersonObject.getAllPerson();

  addClickListenerAddPersonBtn();
  addClickListenerSortNameBtn(listPersonObject);
}

function addClickListenerAddPersonBtn() {
  document.getElementById("add-person-btn").addEventListener("click", () => {
    $("#personModal").modal("show");
  });
}

function addClickListenerSortNameBtn(listPersonObject) {
  document.getElementById("name-inc-btn").addEventListener("click", () => {
    listPersonObject.sortByName(true);
  });
  document.getElementById("name-dec-btn").addEventListener("click", () => {
    listPersonObject.sortByName(false);
  });
}

window.createNewPerson = () => {
  console.log("createNewPerson");
  const formElements = document.querySelectorAll(
    "#person-form input, #person-form select, #person-form textarea"
  );
  console.log(formElements);

  let person = {};

  formElements.forEach((element) => {
    if (element.value !== ""){
        person[element.name] = element.value;
    }
    
  });

  console.log(person);

  listPersonObject.createNewPerson(person);
};

window.changeType = () => {
  let type = getValueById("person-type");
  console.log(`change type ${type}`);
  switch (type) {
    case constants.typeStudent:
      document.getElementById("studentInfo").style.display = "block";
      document.getElementById("employeeInfo").style.display = "none";
      document.getElementById("customerInfo").style.display = "none";
      break;
    case constants.typeEmployee:
      document.getElementById("studentInfo").style.display = "none";
      document.getElementById("employeeInfo").style.display = "block";
      document.getElementById("customerInfo").style.display = "none";
      break;
    case constants.typeCustomer:
      document.getElementById("studentInfo").style.display = "none";
      document.getElementById("employeeInfo").style.display = "none";
      document.getElementById("customerInfo").style.display = "block";
      break;
  }
};
