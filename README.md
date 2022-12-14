# Frontend Mentor - Launch countdown timer solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

build a countdown to a random date

### The challenge

Users should be able to:

### Screenshot

![](/screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

the process was pretty basic until animating the card comes to play...so basically the flipcard contains two block elements which is at the top and bottom and they display the number with the help of css properties they overlap eachother and since the overflow is hidden we cant see the number half height

```css
.top,
.bottom,
.flip-card .top-flip,
.flip-card .bottom-flip {
  height: 0.75em; //half
  line-height: 1;
  padding: 0.25em;
  overflow: hidden;
  font-size: 2.5rem;
  border-radius: 7px;
}
```

and then JS will do the rest of magic starting from dynamically adding the exact time when will end the countdown

```js
datespan.innerHTML = `<span class="datespan-wrapper">the launch date is</span> ${day},${date} ${month} ${year} ${hours} <span class="tik">:</span> ${minutes} am`;
```

to creating the flip animation...the flip animation basically have a callback function which recive two parameters..flipcard[the element that we want to display] and the time that we calculated[newnumber]

```js
function flip(flipCard, newNumber) {}
```

i also consider formatting the time when the number is single digit so i add 0 when its single digit

```js
//format number if they are single digit add 0 infront of
function format(item) {
  if (item < 10) {
    return (item = `0${item}`);
  } else {
    return item;
  }
}
```

another thing to consider is when the countdown ends the page should display somekind of message

```js
//another scenario-when the deadline meets
if (time < 0) {
  clearInterval(countdown);
  deadline.innerHTML = `<h4 class="expired">soory,this countdown is over></h4>`;
}
```

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript
- [SCSS](https://styled-components.com/) - For styles

### What I learned

the new thing i learned is to add animation event listner when it start and when it ends

```js
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
```

### Continued development

to work on animating things using JS

### Useful resources

thanks to MDN

## Author

- Frontend Mentor - [@yishak621](https://www.frontendmentor.io/profile/yourusername)

## Acknowledgments

as always thanks to frontend mentor
