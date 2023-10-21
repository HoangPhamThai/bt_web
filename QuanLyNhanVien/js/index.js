var listEmployee = []

init()

function init(){
  let list = getObjectByKey(keyListEmployee)
  console.log(list)
  if (list != null) {
    listEmployee = list.map((item) => new Employee({
      account: item.account,
      name: item.name,
      email: item.email,
      password: item.password,
      hiringDate: item.hiringDate,
      basicSalary: item.basicSalary,
      position: item.position,
      workingHour: item.workingHour,
    }));
  }
  updateEmployeeTable(listEmployee);
}

function addEmployee() {
  let account = getValueById("tknv")
  let [existedEmployee, isExist] = isEmployeeExist({
    employeeId: account,
    listEmployee: listEmployee
  })
  if (!isExist){
    let employee = new Employee({
      account: getValueById("tknv"),
      name: getValueById("name"),
      email: getValueById("email"),
      password: getValueById("password"),
      hiringDate: getValueById("datepicker"),
      basicSalary: getValueById("luongCB"),
      position: getValueById("chucvu"),
      workingHour: getValueById("gioLam"),
    })
    if (isPassValidation(employee)){
      listEmployee.push(employee)
      saveObject(keyListEmployee, listEmployee)
      updateEmployeeTable(listEmployee)
    }
  }else{
    isPassValidation(existedEmployee)
    showErrorMessageByField({
      idError: "tbTKNV",
      message: messageDuplicatedEmployee
    })
  }
}

function deleteEmployee(account) {
  let id = listEmployee.findIndex((item) => {
    return item.account == account;
  });
  listEmployee.splice(id, 1);
  updateEmployeeTable(listEmployee)
}


function editEmployee(account) {
  let [employee, _] = getEmployeeByAccount(account)
  fillDataToDialog(employee);
}


function updateEmployee() {
  let account = getValueById("tknv");

  let [employee, id] = getEmployeeByAccount(account);
  if (employee == null) {
    alert(`Không có nhân viên có tài khoản là ${account} để cập nhật!`)
  } else {
    let employee = new Employee({
      account: getValueById("tknv"),
      name: getValueById("name"),
      email: getValueById("email"),
      password: getValueById("password"),
      hiringDate: getValueById("datepicker"),
      basicSalary: getValueById("luongCB"),
      position: getValueById("chucvu"),
      workingHour: getValueById("gioLam"),
      rank: getEmployeeRank(getValueById("gioLam")),
    })

    if (isPassValidation(employee)){
      listEmployee[id] = employee
      saveObject(keyListEmployee, listEmployee);
      updateEmployeeTable(listEmployee);
      document.getElementById("btnDong").click()
    }
  }
}

function getEmployeeRank(workingHour) {
  let workingHourNum = parseFloat(workingHour);
  let rank = "";
  if (workingHourNum >= 192) {
    rank = "Xuất sắc";
  } else if (workingHourNum >= 176) {
    rank = "Giỏi";
  } else if (workingHourNum >= 160) {
    rank = "Khá";
  } else {
    rank = "Trung bình";
  }
  return rank;
}

function searchEmployeeByRank() {
  let rank = getValueById("searchName");
  let filteredList = listEmployee.filter((item) => {
    return item.rank() == rank;
  });

  updateEmployeeTable(filteredList);
}

function onchangeSearchRank() {
  let rank = getValueById("searchName");
  if (rank.length == 0) {
    updateEmployeeTable(listEmployee);
  }
}
