import * as constants from "../constants/constant.js";
import CustomerModel from "../models/customer_model.js";
import EmployeeModel from "../models/employee_model.js";
import StudentModel from "../models/student_model.js";
import * as utils from "../utils/utils.js";
import * as dict from "../constants/dictionary.js";

export function getValueById(id) {
  return document.getElementById(id).value;
}

const setValueToElementById = (id, value) => {
  document.getElementById(id).value = value;
};

export function getAllInputFields(id) {
  return document.querySelectorAll(
    `#${id} input, #${id} select, #${id} textarea`
  );
}

export function showElement(id) {
  document.getElementById(id).style.display = "block";

  getAllInputFields(id).forEach(function (element) {
    element.value = "";
  });
}

export function hideElement(id) {
  document.getElementById(id).style.display = "none";

  getAllInputFields(id).forEach(function (element) {
    element.value = "";
  });
}

export function renderListPerson(listPersonOBject) {
  let contentHTML = "";

  listPersonOBject.data.forEach((person) => {
    let personType = dict.mapTypeDisplay[utils.getTypeOfPerson(person)];
    contentHTML += `
        <tr >
            <td>${person.ma}</td>
            <td id="person-hoten-${person.ma}">${person.hoTen}</td>
            <td>${person.diaChi}</td>
            <td>${person.email}</td>
            <td>${personType != null ? personType : ""}</td>
            <td>
            <button id="delete-person-${
              person.ma
            }" class='btn btn-danger btn-sm'>Xoá</button>
            <button id="edit-person-${
              person.ma
            }" class='btn btn-warning btn-sm' data-toggle="modal" data-target="#myModal">Sửa</button>
                
            </td>
        </tr>
        `;
  });

  document.getElementById("table-person").innerHTML = contentHTML;

  listPersonOBject.data.forEach((person) => {
    document
      .getElementById(`person-hoten-${person.ma}`)
      .addEventListener("click", () => {
        showInfo(person);
      });
    document
      .getElementById(`edit-person-${person.ma}`)
      .addEventListener("click", () => {
        editPerson(listPersonOBject, person.ma);
      });
    document
      .getElementById(`delete-person-${person.ma}`)
      .addEventListener("click", () => {
        deletePerson(listPersonOBject, person.ma);
      });
  });
}

const editPerson = (listPersonOBject, ma) => {
  $("#personModal").modal("show");
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "block";
  listPersonOBject.setPersonIdToEdit(ma)
  setTimeout(() => {
    showPersonInfoToDialog(
      listPersonOBject.data.find((person) => person.ma === ma)
    );
  }, 500);
};

const deletePerson = (listPersonOBject, ma) => {
  listPersonOBject.deletePerson(ma);
};

const showInfo = (person) => {
  $("#personInfoModal").modal("show");
  let content = `
    <div>Mã: ${person.ma}</div>
    <div>Họ tên: ${person.hoTen}</div>
    <div>Địa chỉ: ${person.diaChi}</div>
    <div>Email: ${person.email}</div>
    `;

  let personType = utils.getTypeOfPerson(person);
  if (personType !== undefined) {
    content += `<div>Loại: ${dict.mapTypeDisplay[personType]}</div>`;
  }

  switch (personType) {
    case constants.typeStudent:
      content += `<div>Toán: ${person.toan} - Lý: ${person.ly} - Hoá: ${
        person.hoa
      }</div>
      <div>Điểm trung bình: ${person.tinhDtb()}</div>
      `;
      break;
    case constants.typeEmployee:
      content += `<div>Số ngày làm việc: ${
        person.soNgayLam
      } - Lương theo ngày: ${person.luongTheoNgay}</div>
      <div>Tổng lương: ${person.tinhLuong()}</div>
      `;
      break;
    case constants.typeCustomer:
      content += `
        <div>Tên công ty: ${person.tenCty}</div>
        <div>Trị giá hoá đơn: ${person.hoaDon}</div>
        <div>Đánh giá: ${person.danhGia}</div>
        `;
      break;
  }

  document.getElementById("person-info-content").innerHTML = content;
};

const showPersonInfoToDialog = (person) => {
  document.getElementById("hoTen").value = person.hoTen;
  document.getElementById("diaChi").value = person.diaChi;
  document.getElementById("email").value = person.email;

  let personType = utils.getTypeOfPerson(person);

  document.getElementById("person-type").value = personType;

  switch (personType) {
    case constants.typeStudent:
      document.getElementById("studentInfo").style.display = "block";

      getAllInputFields("studentInfo").forEach(function (element) {
        setValueToElementById(element.id, person[element.id]);
      });

      hideElement("employeeInfo");
      hideElement("customerInfo");
      break;
    case constants.typeEmployee:
      document.getElementById("employeeInfo").style.display = "block";

      getAllInputFields("employeeInfo").forEach(function (element) {
        setValueToElementById(element.id, person[element.id]);
      });

      hideElement("studentInfo");
      hideElement("customerInfo");
      break;
    case constants.typeCustomer:
      document.getElementById("customerInfo").style.display = "block";

      getAllInputFields("customerInfo").forEach(function (element) {
        setValueToElementById(element.id, person[element.id]);
      });
      hideElement("employeeInfo");
      hideElement("studentInfo");
      break;
  }
};
