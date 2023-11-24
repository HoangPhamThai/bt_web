import * as dict from "../constants/dictionary.js";

export function validate(data){

}

function validateNotNull(data, id){
    let message = ""
    let isvalid = true
    if(data === null){
        message = dict.fieldNotNull
        isvalid = false;
    }
    let element = document.getElementById(id)
    if (element !== null){
        document.getElementById(id).innerHTML = message
    }
    
    return isvalid;
}
