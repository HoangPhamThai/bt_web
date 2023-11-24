import * as dict from "../constants/dictionary.js";
import * as constants from "../constants/constant.js";


export function validate(data){
    console.log(data)

    let validateHoTen = validateNotNull(data.hoTen, "spanHoTen")
    let validateDiaChi = validateNotNull(data.diaChi, "spanDiaChi")
    let validateEmail = validateNotNull(data.email, "spanEmail")
    let isValid = validateHoTen && validateDiaChi && validateEmail

   
    switch (data.type) {
        case constants.typeStudent:
            let validatedToan = validateInRange(data.toan, 0, 10, "spanToan")
            let validatedLy = validateInRange(data.ly, 0, 10, "spanLy")
            let validatedHoa = validateInRange(data.hoa, 0, 10, "spanHoa")
            isValid = isValid &&  validatedToan && validatedLy && validatedHoa
            break;
        case constants.typeEmployee:
            let validateSoNgayLam = validateNotNull(data.soNgayLam, "spanSoNgayLam")
            let validateLuongTheoNgay = validateNotNull(data.luongTheoNgay, "spanLuongTheoNgay")
            isValid = isValid && validateSoNgayLam && validateLuongTheoNgay
            break;
        case constants.typeCustomer:
            let validateTenCty = validateNotNull(data.tenCty, "spanTenCty")
            let validateHoaDon = validateNotNull(data.hoaDon, "spanTriGiaHoaDon")
            let validateDanhGia = validateNotNull(data.danhGia, "spanDanhGia")
            isValid = isValid && validateTenCty && validateHoaDon && validateDanhGia
            break;
    }

    console.log(isValid)
    return isValid
}

const validateNotNull = (data, id) =>{
    
    let message = ""
    let isvalid = true
    if(data == null || data === ""){
        message = dict.fieldNotNull
        isvalid = false;
    }
    let element = document.getElementById(id)
    if (element !== null){
        document.getElementById(id).innerHTML = `<div class="text-red-400 text-sm">${message}</div>`
    }
    
    return isvalid;
}

const validateInRange = (data, minVal, maxVal, id) =>{
    let dataNum = data * 1.0
    let message = dict.outOfRange.concat(`: ${minVal} - ${maxVal}`)
    let isvalid = false
    console.log(dataNum, message)
    if (!dataNum){
        message = dict.fieldNotNull
        
    }else if (dataNum >= minVal && dataNum <= maxVal) {
        message = ""
        isvalid = true;
    }
    let element = document.getElementById(id)
    if (element !== null){
        document.getElementById(id).innerHTML = `<div class="text-red-400 text-sm">${message}</div>`
    }
    
    return isvalid;
}