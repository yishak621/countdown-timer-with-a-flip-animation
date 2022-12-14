//Calculation
//LOGIC-lets say we want the countdown for 8 days
//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
let futuredate = new Date(2023, 2, 21, 23, 55, 41);
const futureTime = futuredate.getTime();

function getRemainingTime() {
  const today = new Date().getTime(); //current time
  const t = futureTime - today; //the output of t is in mili seconds(ms)
  //console.log(t); main logic
  //1s=1000ms
  //1m=60s
  //1hr=60min
  //1d=24hr

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000; //86400000ms
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const oneSec = 1000;

  let remainDay = t / oneDay;
  remainDay = Math.floor(remainDay);

  //remaining Hr,min,sec
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / oneSec);

  const values = [remainDay, hours, minutes, seconds];
  //Display function
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  //************the page slide effect

  //callback function to display to the DOM
  //item=[.number] and index is there index in the numbersDOM array

  const displayDOM = (item, index) => {
    item.innerHTML = format(values[index]); //grabbing the number value and format it
  };
  //invoking the function for all numbers class
  numbersDOM.forEach(displayDOM);

  //another scenario-when the deadline meets
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired"soory,this countdown is over></h4>`;
  }
}
//invoking the function by Setinterval
let countdown = setInterval(getRemainingTime, 1000); //in every one second
getRemainingTime();
