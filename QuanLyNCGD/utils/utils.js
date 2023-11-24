import * as constants from '../constants/constant.js';

export function getTypeOfPerson(person){
    if (person instanceof StudentModel){
        return constants.typeStudent;
    }else if (person instanceof EmployeeModel){
        return constants.typeEmployee;
    }else if (person instanceof CustomerModel){
        return constants.typeCustomer;
    }
}