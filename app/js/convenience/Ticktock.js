Object.extend = Object.extend || function (obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
};

function zeroPad(num) {
    return (num < 10 ? '0' : '') + num;
  }

function Ticktock (settings) {
  this._settings = settings || { timeFormat: '12hr'};
}

Object.extend(Ticktock.prototype, {

  _getDateAndTime: function () {

    // grab the current time
    var dateTime = new Date();

    // add text lookups for month and days
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

    // parse the separate elements out of the date/time
    var year = dateTime.getFullYear();
    var month = months[dateTime.getMonth()].toUpperCase();
    var day = dateTime.getDate();
    var dayOfWeek = days[dateTime.getDay()].toUpperCase();
    var hours = zeroPad(dateTime.getHours());
    if (dateTime.getHours() >= 13 && this._settings.timeFormat == '12hr') {
      hours = hours - 12;
    }
    var minutes = zeroPad(dateTime.getMinutes());
    var seconds = zeroPad(dateTime.getSeconds());
    var ampm = (dateTime.getHours() >= 12) ? 'PM' : 'AM';

    var textTime;
    if (this._settings.timeFormat == '24hr') {
      textTime = hours + ':' + minutes + ':' + seconds;
    } else {
      textTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }

    var textDate = dayOfWeek + ' ' + month + ' ' + day + ', ' + year;

    return {date: textDate, time: textTime};

  },

  start: function (callback) {
    this.intervalId = setInterval(function () {
      callback(this._getDateAndTime());
    }.bind(this), 1000);
  },

  stop: function () {
    clearInterval(this.intervalId);
  }

});
