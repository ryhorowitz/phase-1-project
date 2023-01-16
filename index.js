//query select
// <div id="current-date">todays date</div>

const body = document.querySelector('body')
const currentDate = document.querySelector('#current-date')
const cdate = document.querySelector('#current-civil-date')
const hdate = document.querySelector('#current-hdate')
const form = document.querySelector('#hebrew-birthday-calc')
const birthdayDiv = document.querySelector('#birthday-container')
const birthdayText = document.querySelector('#birthday-text')
const birthdayContainer = document.querySelector('#birthday-container')
const URI = `https://www.hebcal.com/converter`
const todaysDateStr = new Date().toISOString().slice(0, 10)
const todaysDateDisplayStr = new Date().toString().slice(0, 15)
let thisYear
const next5Years = []

const todaysDateQuery = `${URI}?cfg=json&date=${todaysDateStr}&g2h=1&strict=1`
//finds which radio input is selected and returns its value
function radioChecked(nodeList) {
  const nodes = Array.from(nodeList)
  const found = nodes.find(input => input.checked === true)
  return found.value
}

function makeNext5YearsArray(arr) {
  let i = 5
  let year = (thisYear + 1)  
  while (i > 0) {
    arr.push(year)
    year++
    i--
  }
  console.log(arr)
}
//api function to get hebrew date
function getTodaysHebrewDate() {
  fetch(todaysDateQuery)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      const { hm, hd, hy, hebrew } = { ...data }
      cdate.innerText = `${todaysDateDisplayStr}`
      hdate.innerText = `${hm} ${hd}, ${hy} ${hebrew}`
      return hy
    })
    .then(year => {
      thisYear = year
      makeNext5YearsArray(next5Years)
    })

    .catch(err => console.error(err.message))
}
//on DOM load hit api and display today's civil and hebrew date
document.addEventListener('DOMContentLoaded', () => {
  getTodaysHebrewDate()
})
function getHebrewBirthday(str) {
  fetch(str)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      addBirthdayToDOM(data)
    })
    .catch(err => console.error(err.message))
}

function addBirthdayToDOM(data) {
  const { hm, hd, hy, hebrew } = { ...data }
  birthdayText.innerText = `Your Hebrew Birthday is ${hm} ${hd}, ${hy} ${hebrew}`
  console.log(birthdayText)
  birthdayDiv.appendChild(birthdayText)
  body.append(birthdayDiv)
}

function formatQueryDate(date) { //takes in 11/22/1988 returns 1988-11-22
  const dateArr = date.split('/')
  const result = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
  return result
}
//on Form submit get birthday info
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const birthday = document.querySelector('input#birthday')
  const timesOfDay = document.querySelectorAll('input[name="time-of-day"]')
  const timeOfDay = radioChecked(timesOfDay)
  const gs = timeOfDay === 'evening' ? 'on' : 'off'
  const qDate = formatQueryDate(birthday.value)
  console.log('qDate', qDate)
  const qString = `${URI}?cfg=json&date=${qDate}&g2h=1&strict=1&gs=${gs}`//defaults to after sunset
  getHebrewBirthday(qString)
})

//mouse over hebrew birthday div and find out the birthdays for the next five years
birthdayContainer.addEventListener('mouseover', () => {
  console.log('mouse over event')

})

//find out what the hebrew birthday will be the next 5 years
// using the month and day make a batch request to of the next five hebrew years
//kislev 13 5784, 5785, 5786, 5787, 5788