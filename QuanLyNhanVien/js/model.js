function Employee({
    account, name, email, password, hiringDate, basicSalary, position, workingHour
}) {
    this.account = account
    this.name = name
    this.email = email
    this.password = password
    this.hiringDate = hiringDate
    this.basicSalary = basicSalary
    this.position = position
    this.workingHour = workingHour
    this.totalSalary = function () {
        let ratio = mapPositionSalary[this.position]
        if (ratio !== null) {
            return ratio * parseFloat(basicSalary)
        }
        return 0
    }
    this.rank = function () {
        let workingHourNum = parseFloat(this.workingHour)
        let rank = ""
        if (workingHourNum >= 192) {
            rank = "Xuất sắc"
        } else if (workingHourNum >= 176) {
            rank = "Giỏi"
        } else if (workingHourNum >= 160) {
            rank = "Khá"
        } else {
            rank = "Trung bình"
        }
        return rank
    }
}