import * as constants from "../constants/constant.js";
import * as dict from "../constants/dictionary.js";
import StudentModel from "../models/student_model.js";
import EmployeeModel from "../models/employee_model.js";
import CustomerModel from "../models/customer_model.js";
import PersonModel from "../models/person_model.js";

import * as controller from "./controller.js";
import * as utils from "../utils/utils.js";

export default class ListPerson {
  constructor() {
    this.data = [];
    this.unfilteredData = [];
  }

  setPersonIdToEdit = function(id){
    this.editId = id
  }

  filterByType = function(type){
    switch (type) {
      case constants.typeStudent:
        this.data = this.unfilteredData.filter((item) => {
          return utils.getTypeOfPerson(item) === constants.typeStudent;
        });
        break;
      case constants.typeEmployee:
        this.data = this.unfilteredData.filter((item) => {
          return utils.getTypeOfPerson(item) === constants.typeEmployee;
        });
        break;
      case constants.typeCustomer:
        this.data = this.unfilteredData.filter((item) => {
          return utils.getTypeOfPerson(item) === constants.typeCustomer;
        });
        break;
      default:
        this.data = [...this.unfilteredData]
        break;
    }
    
  }

  getAllPerson = function () {
    axios({
      url: constants.apiDomain.concat(constants.personEndPoint),
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) {
          this.data = res.data.map((item) => {
            switch (item.type) {
              case constants.typeStudent:
                return new StudentModel({
                  hoTen: item.hoTen,
                  diaChi: item.diaChi,
                  ma: item.ma,
                  email: item.email,
                  toan: item.toan,
                  ly: item.ly,
                  hoa: item.hoa,
                });
              case constants.typeEmployee:
                return new EmployeeModel({
                  hoTen: item.hoTen,
                  diaChi: item.diaChi,
                  ma: item.ma,
                  email: item.email,
                  soNgayLam: item.soNgayLam,
                  luongTheoNgay: item.luongTheoNgay,
                });
              case constants.typeCustomer:
                return new CustomerModel({
                  hoTen: item.hoTen,
                  diaChi: item.diaChi,
                  ma: item.ma,
                  email: item.email,
                  tenCty: item.tenCty,
                  hoaDon: item.hoaDon,
                  danhGia: item.danhGia,
                });
              default:
                return new PersonModel({
                  hoTen: item.hoTen,
                  diaChi: item.diaChi,
                  ma: item.ma,
                  email: item.email,
                });
            }
          });
          this.unfilteredData = [...this.data]
          controller.renderListPerson(this);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createNewPerson = function (person) {
    axios({
      url: constants.apiDomain.concat(constants.personEndPoint),
      method: "POST",
      data: person,
    })
      .then((res) => {
        $("#personModal").modal("hide");
        this.getAllPerson();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updatePerson = function (person) {
    if (this.editId != null){
        axios({
            url: constants.apiDomain.concat(constants.personEndPoint + "/" + this.editId),
            method: "PUT",
            data: person,
          })
           .then((res) => {
            $("#personModal").modal("hide");
              this.editId = undefined
              this.getAllPerson();
            })
           .catch((err) => {
              console.log(err);
            });
    }else{
        alert(dict.selectPersonToUpdate)
    }
    
  }

  sortByName = function (isInc) {
    this.data.sort((a, b) => {
      if (isInc) {
        return a.hoTen.localeCompare(b.hoTen);
      } else {
        return b.hoTen.localeCompare(a.hoTen);
      }
    });
    controller.renderListPerson(this);
  };

  deletePerson = function (ma) {
    axios({
      url: constants.apiDomain.concat(constants.personEndPoint + "/" + ma),
      method: "DELETE",
    })
     .then((res) => {
        this.getAllPerson();
      })
     .catch((err) => {
        console.log(err);
      });
  }
}
