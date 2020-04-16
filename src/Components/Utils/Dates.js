class Dates {

  getDay(day) {
    switch (day) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return "No idea"
    }
  }

  getMonth(month) {
    switch (month) {
      case 0:
        return 'JAN'
      case 1:
        return 'FEB'
      case 2:
        return 'MAR'
      case 3:
        return 'APR'
      case 4:
        return 'MAY'
      case 5:
        return 'JUN'
      case 6:
        return 'JUL'
      case 7:
        return 'AUG'
      case 8:
        return 'SEP'
      case 9:
        return 'OCT'
      case 10:
        return 'NOV'
      case 11:
        return 'DEC'
      default:
        return ''
    }
  }

  getMonthLong(month) {
    switch (month) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'October'
      case 10:
        return 'November'
      case 11:
        return 'December'
      default:
        return ''
    }
  }

  getTimezone(offset) {
    if (offset === 0 || offset === "0") {
      return 'GMT'
    }
    else if (offset > 0) {
      let tz = Math.round(offset/60)
      return 'GMT+' + tz
    }
    else if (offset < 0) {
      let tz = Math.round(offset/60)
      return 'GMT' + tz
    }
  }

  getHours(hour) {
    if (hour < 10) {
      return '0' + hour
    } else {
      return hour
    }
  }

  getMinutes(minute) {
    if (minute < 10) {
      return '0' + minute
    } else {
      return minute
    }
  }
}

export default Dates
