function getValueById(id) {
  return document.getElementById(id).value;
}

function setValueById(id, value) {
  document.getElementById(id).value = value;
}

function isEmployeeExist({ employeeId, listEmployee }) {
  let result = listEmployee.findIndex((value) => {
    return value.account == employeeId;
  });
  return result != -1;
}

function showErrorMessageByField({ idError, message = "" }) {
  let errorElement = document.getElementById(idError);
  if (message.length == 0) {
    errorElement.style.display = "none";
  } else {
    errorElement.style.display = "block";
    errorElement.innerText = message;
  }
}

function fillDataToDialog(employee) {
  setValueById("tknv", employee.account);
  setValueById("name", employee.name);
  setValueById("email", employee.email);
  setValueById("password", employee.password);
  setValueById("datepicker", employee.hiringDate);
  setValueById("luongCB", employee.basicSalary);
  setValueById("chucvu", employee.position);
  setValueById("gioLam", employee.workingHour);
}

function updateEmployeeTable(listEmployee) {
  let contentHTML = "";
  for (let i = 0; i < listEmployee.length; i++) {
    let employee = listEmployee[i];
    contentHTML += `
        <tr>
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.hiringDate}</td>
            <td>${employee.position}</td>
            <td>${new Intl.NumberFormat("en-US").format(
              employee.totalSalary()
            )}</td>
            <td>${employee.rank()}</td>
            <td>
            <button onclick="deleteEmployee('${
              employee.account
            }')" class='btn btn-danger btn-sm'>Xoá</button>
            <button onclick="editEmployee('${
              employee.account
            }')" class='btn btn-warning btn-sm' data-toggle="modal" data-target="#myModal">Sửa</button>
                
            </td>
        </tr>
        `;
  }

  document.getElementById("tableDanhSach").innerHTML = contentHTML;
}


function isPassValidation(employee) {
  let isPass = true;
  let isComponentPass = true;
  let validation = new Validate();

  // Account
  isComponentPass = validation.isNumberInRange(employee.account.length, 4, 6);
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbTKNV",
    message: isComponentPass == true ? "" : messageInvalidAccount,
  });

  // Name
  isComponentPass = validation.isOnlyLetters(employee.name);
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbTen",
    message: isComponentPass == true ? "" : messageInvalidName,
  });

  // Email
  isComponentPass = validation.isEmailValid(employee.email);
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbEmail",
    message: isComponentPass == true ? "" : messageInvalidEmail,
  });

  // Password
  isComponentPass = validation.isPasswordValid(employee.password);
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbMatKhau",
    message: isComponentPass == true ? "" : messageInvalidPassword,
  });

  // Hiring date
  isComponentPass = validation.isDateFormatMMDDYYYY(employee.hiringDate);
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbNgay",
    message: isComponentPass == true ? "" : messageInvalidDate,
  });

  // Salary
  isComponentPass = validation.isNumberInRange(
    employee.basicSalary,
    minBasicSalary,
    maxBasicSalary
  );
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbLuongCB",
    message: isComponentPass == true ? "" : messageInvalidBasedSalary,
  });

  // Position
  isComponentPass = validation.isItemInList(
    employee.position,
    Object.keys(mapPositionSalary)
  );
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbChucVu",
    message: isComponentPass == true ? "" : messageInvalidPotision,
  });

  // Working hour
  isComponentPass = validation.isNumberInRange(
    employee.workingHour,
    minWorkingHour,
    maxWorkingHour
  );
  isPass &= isComponentPass;
  showErrorMessageByField({
    idError: "tbGiolam",
    message: isComponentPass == true ? "" : messageInvalidWorkingHour,
  });

  return isPass;
}


function getEmployeeByAccount(account) {
  let id = 0;
  let employee = listEmployee.find((value, index, _) => {
    if (value.account === account) {
      id = index;
    }
    return value.account === account;
  });
  return [employee, id];
}