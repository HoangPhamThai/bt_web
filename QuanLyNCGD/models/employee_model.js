import PersonModel from "./person_model.js";

export default class EmployeeModel extends PersonModel {
  constructor({ hoTen, diaChi, ma, email, soNgayLam, luongTheoNgay }) {
    super({ hoTen: hoTen, diaChi: diaChi, ma: ma, email: email });
    this.soNgayLam = soNgayLam;
    this.luongTheoNgay = luongTheoNgay;
  }

  tinhLuong = () => {
    return this.soNgayLam * 1.0 + this.luongTheoNgay * 1.0;
  };
}
