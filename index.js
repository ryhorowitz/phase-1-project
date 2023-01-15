//query select
// <div id="current-date">todays date</div>
const body = document.querySelector('body')
const currentDate = document.querySelector('#current-date')
const cdate = document.querySelector('#current-civil-date')
const hdate = document.querySelector('#current-hdate')
const form = document.querySelector('#birthday-calc')
const URI = `https://www.hebcal.com/converter`
const todaysDateStr = new Date().toISOString().slice(0, 10)
const todaysDateDisplayStr = new Date().toString().slice(0, 15)

const todaysDateQuery = `${URI}?cfg=json&date=${todaysDateStr}&g2h=1&strict=1`
//finds which radio input is selected and returns its value
function radioChecked(nodeList) {
  const nodes = Array.from(nodeList)
  const found = nodes.find(input => input.checked === true)
  return found.value
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
    })
  // append data to div
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
    // with fetch data now display person's heebrew birthday on DOM
    // add Birthday to DOM
  })
}

function addBirthdayToDOM(data) {
  const { hm, hd, hy, hebrew } = { ...data }
  const birthdayDiv = document.createElement('div')
  birthdayDiv.className = 'birthday-container'
  const birthdayText = document.createElement('div')
  birthdayText.id = 'birthday=text'
  birthdayText.innerText = `Your Hebrew Birthday is ${hm} ${hd}, ${hy} ${hebrew}`
  console.log(birthdayText)
  birthdayDiv.appendChild(birthdayText)
  body.append(birthdayDiv)
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

function formatQueryDate(date) { //takes in 11/22/1988 returns 1988-11-22
  const dateArr = date.split('/')
  const result = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
  return result
}