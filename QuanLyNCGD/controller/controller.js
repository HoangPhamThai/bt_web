import * as constants from "../constants/constant.js";
import CustomerModel from "../models/customer_model.js";
import EmployeeModel from "../models/employee_model.js";
import StudentModel from "../models/student_model.js";

export function getValueById(id) {
  return document.getElementById(id).value;
}

const getDataFromDialog = () => {
  return {
    hoTen: getValueById("hoTen"),
    diaChi: getValueById("diaChi"),
    email: getValueById("email"),
    type: getValueById("type"),
    toan: getValueById("toan"),
    ly: getValueById("ly"),
    hoa: getValueById("hoa"),

    soNgayLam: getValueById("soNgayLam"),
    luongTheoNgay: getValueById("luongTheoNgay"),
    tenCty: getValueById("tenCty"),
    hoaDon: getValueById("hoaDon"),
    danhGia: getValueById("danhGia"),
  };
};


function getTypeDisplay(person){
    
}

export function renderListPerson(listPersonOBject) {
  let contentHTML = "";

  console.log(listPersonOBject.data)
  listPersonOBject.data.forEach((person) => {
    contentHTML += `
        <tr >
            <td>${person.ma}</td>
            <td id="person-hoten-${person.ma}">${person.hoTen}</td>
            <td>${person.diaChi}</td>
            <td>${person.email}</td>
            <td>${person.type !== null ? "" : ""}</td>
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
        editPerson(person.ma);
      });
    document
      .getElementById(`delete-person-${person.ma}`)
      .addEventListener("click", () => {
        deletePerson(listPersonOBject, person.ma);
      });
  });
}

const editPerson = function (ma) {
  console.log(ma);
};

const deletePerson = function (listPersonOBject, ma) {
  console.log(ma);
  listPersonOBject.deletePerson(ma);
};

const showInfo = function (person) {
  $("#personInfoModal").modal("show");
  let content = `
    <div>Mã: ${person.ma}</div>
    <div>Họ tên: ${person.hoTen}</div>
    <div>Địa chỉ: ${person.diaChi}</div>
    <div>Email: ${person.email}</div>
    `;
  if (person.type !== undefined) {
    content += `<div>Loại: ${person.type}</div>`;
  }
  console.log(person.type);

  if (person instanceof StudentModel){
    content += `
        <div>Điểm số:</div>
        <div>Toán: ${person.toan} - Lý: ${person.ly} - Hoá: ${person.hoa}</div>
        <div>Điểm trung bình: ${person.tinhDtb()}</div>
        `;
  }else if (person instanceof EmployeeModel){
    content += `
        <div>Số ngày làm việc: ${person.soNgayLamViec} - Lương theo ngày: ${
        person.luongTheoNgay
      }</div>
        <div>Tổng lương: ${person.tinhLuong()}</div>
        `;
  }else if (person instanceof CustomerModel){
    content += `
        <div>Tên công ty: ${person.tenCty}</div>
        <div>Trị giá hoá đơn: ${person.hoaDon}</div>
        <div>Đánh giá: ${person.danhGia}</div>
        `;
  }

  document.getElementById("person-info-content").innerHTML = content;
};

