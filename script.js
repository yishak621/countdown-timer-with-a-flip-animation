//Date-DATA
const months = [
  //note that array is 0 index based
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdays = [
  'Sunday', // day start from sunday
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
//Declaration
const deadline = document.querySelector('.deadline');
const datespan = document.querySelector('.datespan');

//Calculation
//LOGIC-lets say we want the countdown for 2023 march
//new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
let futuredate = new Date(2023, 2, 21, 23, 55, 41);
const futureTime = futuredate.getTime(); //in milisecond

//Daynamically adding the datespan textcontent
const year = futuredate.getFullYear();
const hours = futuredate.getHours();
const minutes = futuredate.getMinutes();
//<!--TODO:note that to get the actual day and month value we should consider the 0 index based array...so we should minus 1 from the normal day and month conunting when we set the value of futureDate
let month = futuredate.getMonth();
month = months[month];

let day = futuredate.getDay();
day = weekdays[day]; //since days are 0 index based array and it starts from sunday

const date = futuredate.getDate();

datespan.innerHTML = `<span class="datespan-wrapper">the launch date is</span> ${day},${date} ${month} ${year} ${hours}<span class="tik">:</span>${minutes} am`;
//creating the dots effect
const tik = datespan.querySelector('.tik');
function tikToggle() {
  if (!tik.classList.contains('tik-tok')) {
    return tik.classList.add('tik-tok');
  } else {
    return tik.classList.remove('tik-tok');
  }
}
setInterval(tikToggle, 1000);

//COUNTER

let countdown = setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = Math.ceil(futuredate - currentDate);
  flipAllCards(timeBetweenDates); //in mili seconds
}, 1000);

function flipAllCards(time) {
  //values in ms
  const oneDay = 24 * 60 * 60 * 1000; //86400000ms
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const oneSec = 1000;

  let remainDay = time / oneDay;
  remainDay = Math.floor(remainDay);

  //remaining Hr,min,sec
  let hours = Math.floor((time % oneDay) / oneHour); //% means time/oneday and then the remaining value
  let minutes = Math.floor((time % oneHour) / oneMin);
  let seconds = Math.floor((time % oneMin) / oneSec);

  flip(document.querySelector('[data-days-tens]'), Math.floor(remainDay)); //DaysDOM

  flip(document.querySelector('[data-hours-tens]'), Math.floor(hours)); //HoursDOM

  flip(document.querySelector('[data-minutes-tens]'), Math.floor(minutes)); //MinutesDOM

  flip(document.querySelector('[data-seconds-tens]'), Math.floor(seconds)); //SecondsDOM

  //another scenario-when the deadline meets
  if (time < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">soory,this countdown is over></h4>`;
  }
}

//Callback function--recives two parameters flipcard and the new number which activate the animation
function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector('.top');
  const startNumber = parseInt(topHalf.textContent); //this value will change each and every time when we loop over it
  if (startNumber < 10) {
    format(startNumber);
  }
  //format number if they are single digit add 0 infront of
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  if (newNumber === startNumber) return; //which mean return if the number is the same as it is before
  //adding element and class which enable them to flip
  const bottomHalf = flipCard.querySelector('.bottom');
  const topFlip = document.createElement('div');
  topFlip.classList.add('top-flip');

  const bottomFlip = document.createElement('div');
  bottomFlip.classList.add('bottom-flip');
  //changing the textContent
  topHalf.textContent = format(startNumber);
  bottomHalf.textContent = format(startNumber); //the number in bottom increase by 1 second from the top

  topFlip.textContent = format(startNumber);
  bottomFlip.textContent = format(newNumber); //this is also increase by 1 second from top flip
  //append
  flipCard.append(topFlip, bottomFlip);
  //Event listener
  topFlip.addEventListener('animationstart', (e) => {
    topHalf.textContent = format(newNumber); //when the animationstart the number on the tophalf is newnumber
  });
  topFlip.addEventListener('animationend', (e) => {
    topFlip.remove(); //when the animation end remove the element(tophalf)
  });
  bottomFlip.addEventListener('animationend', (e) => {
    bottomHalf.textContent = format(newNumber); //when the animation end the number on the bottom is newnumber
    bottomFlip.remove(); //when the animation end remove the element(bottomhalf)
  });
}
