function getObjectByKey(key){
    let value = localStorage.getItem(key)
    if (value !== undefined){
        return JSON.parse(value)
    }
    return value
}

function saveObject(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}