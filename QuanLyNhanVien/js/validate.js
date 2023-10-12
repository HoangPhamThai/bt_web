function Validate() {
  this.isFieldEmpty = (value) => {
    if (value == null || value == "") return true;
    return false;
  };
  this.isNumberInRange = (value, min, max) => {
    if (value == null) return false;
    if (
      parseFloat(value) >= parseFloat(min) &&
      parseFloat(value) <= parseFloat(max)
    ) {
      return true;
    }
    return false;
  };
  this.isEmailValid = (value) => {
    return regexFormatEmail.test(value);
  };
  this.isPasswordValid = (value) => {
    return regexFormatPassword.test(value);
  };
  this.isDateFormatMMDDYYYY = (value) => {
    return regexMMDDYYYY.test(value);
  };
  this.isItemInList = (item, list) => {
    return (
      list.findIndex((value) => {
        console.log(`value = ${value} - item = ${item}`);
        return value == item;
      }) !== -1
    );
  };
  this.isOnlyLetters = (value) => {
    if (value == null) return false;
    return regexOnlyLetter.test(value.replace(/\s/g, ""));
  };
}
