import PersonModel from "./person_model.js";

export default class StudentModel extends PersonModel{
    constructor({hoTen, diaChi, ma, email, toan, ly, hoa}) {
        super({hoTen: hoTen, diaChi: diaChi, ma: ma, email: email});
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    }

    tinhDtb = () => {
        return (this.toan * 1.0 + this.ly * 1.0 + this.hoa * 1.0)/3
    }
}