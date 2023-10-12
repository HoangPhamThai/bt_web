const keyListEmployee = "keyListEmployee";

const regexOnlyLetter = /^[a-zA-Z]+$/;
const regexFormatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexFormatPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,10}$/;
const regexMMDDYYYY =
  /^(0[1-9]|1[1,2])(\/)(0[1-9]|[12][0-9]|3[01])(\/)(\d{4})$/;
const minAccountLength = 4
const maxAccountLength = 6
const minBasicSalary = 1000000;
const maxBasicSalary = 20000000;
const minWorkingHour = 80;
const maxWorkingHour = 200;
const mapPositionSalary = {
  "Giám đốc": 3,
  "Trưởng phòng": 2,
  "Nhân viên": 1,
};


const messageInvalidAccount = "Tài khoản phải từ 4-6 ký tự"
const messageInvalidName = "Tên phải là chữ, không để trống"
const messageInvalidEmail = "Email không đúng định dạng"
const messageInvalidPassword = "Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
const messageInvalidDate = "Ngày phải theo định dạng mm/dd/yyyy"
const messageInvalidBasedSalary = "Lương cơ bản phải từ 1 000 000 - 20000 000"
const messageInvalidPotision = "Vị trí phải là Giám đốc, Trưởng phòng, hoặc Nhân viên"
const messageInvalidWorkingHour = "Số giờ làm phải từ 80-200 giờ"
const messageDuplicatedEmployee = "Tài khoản nhân viên đã tồn tại"