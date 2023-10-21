function getValueById(id) {
  return document.getElementById(id).value;
}

function setValueById(id, value) {
  document.getElementById(id).value = value;
}

function getStudentInfo() {
  return new Student({
    id: getValueById("txtMaSV"),
    name: getValueById("txtTenSV"),
    email: getValueById("txtEmail"),
    password: getValueById("txtPass"),
    dob: getValueById("txtNgaySinh"),
    course: getValueById("khSV"),
    mathScore: getValueById("txtDiemToan"),
    physicsScore: getValueById("txtDiemLy"),
    chemistryScore: getValueById("txtDiemHoa"),
  });
}

function fillDataToDialog(student) {
  setValueById("txtMaSV", student.id);
  setValueById("txtTenSV", student.name);
  setValueById("txtEmail", student.email);
  setValueById("txtPass", student.password);
  setValueById("txtNgaySinh", student.dob);
  setValueById("khSV", student.course);
  setValueById("txtDiemToan", student.score.math);
  setValueById("txtDiemLy", student.score.physics);
  setValueById("txtDiemHoa", student.score.chemistry);
}

function getStudentById(id, listStudent) {
  if (listStudent.length == 0) return undefined;
  return listStudent.find((student) => student.id === id);
}

function getListStudentByName(name) {
  return listStudent.filter((student) => student.name === name);
}

function renderTableStudent(listStudent) {
  let contentHTML = "";
  for (let i = 0; i < listStudent.length; i++) {
    let student = listStudent[i];
    contentHTML += `
          <tr>
              <td>${student.id}</td>
              <td>${student.name}</td>
              <td>${student.email}</td>
              <td>${student.dob}</td>
              <td>${student.course}</td>
              <td>${student.score.average()}</td>
              <td>
              <button onclick="deleteStudent('${
                student.id
              }')" class='btn btn-danger btn-sm'>Xoá</button>
              <button onclick="editStudent('${
                i
              }')" class='btn btn-warning btn-sm' data-toggle="modal" data-target="#myModal">Sửa</button>
                  
              </td>
          </tr>
          `;
  }

  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}