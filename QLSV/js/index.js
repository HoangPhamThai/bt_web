var listStudent = [];

init();

function init() {
  let list = getObjectByKey(keyListStudent);
  if (list != null) {
    listStudent = list.map(
      (item) =>
        new Student({
          id: item.id,
          name: item.name,
          email: item.email,
          password: item.password,
          dob: item.dob,
          course: item.course,
          mathScore: item.score.math,
          physicsScore: item.score.physics,
          chemistryScore: item.score.chemistry,
        })
    );
    renderTableStudent(listStudent);
  }
}

function addStudent() {
  let newStudent = getStudentInfo();
  if (getStudentById(newStudent.id, listStudent) == null) {
    listStudent.push(newStudent);
    saveObject(keyListStudent, listStudent);
    renderTableStudent(listStudent);
  } else {
    alert(errorStudentExisted);
  }
}

function deleteStudent(studentId) {
  let id = listStudent.findIndex((item) => {
    return item.id == studentId;
  });
  listStudent.splice(id, 1);
  saveObject(keyListStudent, listStudent);
  renderTableStudent(listStudent);
}

function editStudent(idInList) {
  fillDataToDialog(listStudent[idInList]);
}

function updateStudent() {
  let updatedStudent = getStudentInfo();
  let currentStudent = getStudentById(updatedStudent.id, listStudent);
  if (currentStudent != null) {
    let id = listStudent.findIndex((item) => item.id === currentStudent.id)
    listStudent[id] = updatedStudent;
    saveObject(keyListStudent, listStudent);
    renderTableStudent(listStudent);
  } else {
    alert(errorStudentNotExist);
  }
}


function search(){
    let searchInput = getValueById("txtSearch")

    if (searchInput == null || searchInput == ""){
        return renderTableStudent(listStudent);
    }
    let result = listStudent.filter((item) => {
        return item.name.includes(searchInput)
    })
    renderTableStudent(result);
}

function reset(){
    fillDataToDialog(null);
}