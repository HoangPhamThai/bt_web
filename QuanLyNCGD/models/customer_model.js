import PersonModel from "./person_model.js";

export default class CustomerModel extends PersonModel {
  constructor({ hoTen, diaChi, ma, email, tenCty, hoaDon, danhGia }) {
    super({ hoTen: hoTen, diaChi: diaChi, ma: ma, email: email });
    this.tenCty = tenCty;
    this.hoaDon = hoaDon;
    this.danhGia = danhGia;
  }

}
