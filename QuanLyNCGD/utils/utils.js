import * as constants from "../constants/constant.js";
import StudentModel from "../models/student_model.js";
import EmployeeModel from "../models/employee_model.js";
import CustomerModel from "../models/customer_model.js";

export function getTypeOfPerson(person) {
  if (person instanceof StudentModel) {
    return constants.typeStudent;
  } else if (person instanceof EmployeeModel) {
    return constants.typeEmployee;
  } else if (person instanceof CustomerModel) {
    return constants.typeCustomer;
  }
  return undefined;
}
