var startDate = new Date(2021, 3, 15, 0, 0, 0);
var endDate = new Date(2022, 3, 15, 0, 0, 0);



var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;


function setTimeRemaining(){
  let currentDate = new Date();
  let diff = endDate - currentDate;

  if(diff < 0)return;

  let days = Math.floor(diff / _day); if(days < 10) days = "0"+days;
  let hours = Math.floor((diff % _day) / _hour); if(hours < 10) hours = "0"+hours;
  let minutes = Math.floor((diff % _hour) / _minute); if(minutes < 10) minutes = "0"+minutes;
  let seconds = Math.floor((diff % _minute) / _second); if(seconds < 10) seconds = "0"+seconds;
  document.getElementById('trD').innerHTML = days;
  document.getElementById('trH').innerHTML = hours;
  document.getElementById('trM').innerHTML = minutes;
  document.getElementById('trS').innerHTML = seconds;

  setPlayingFor();
}

function setPlayingFor(){
  let currentDate = new Date();
  let diff = Math.abs(currentDate - startDate);

  let days = Math.floor(diff / _day); if(days < 10) days = "0"+days;
  let hours = Math.floor((diff % _day) / _hour); if(hours < 10) hours = "0"+hours;
  let minutes = Math.floor((diff % _hour) / _minute); if(minutes < 10) minutes = "0"+minutes;
  let seconds = Math.floor((diff % _minute) / _second); if(seconds < 10) seconds = "0"+seconds;
  document.getElementById('pfD').innerHTML = days;
  document.getElementById('pfH').innerHTML = hours;
  document.getElementById('pfM').innerHTML = minutes;
  document.getElementById('pfS').innerHTML = seconds;
}
