const body = document.querySelector('body')
const currentDate = document.querySelector('#current-date')
const cdate = document.querySelector('#current-civil-date')
const hdate = document.querySelector('#current-hdate')
const form = document.querySelector('#hebrew-birthday-calc')
const birthdayDiv = document.querySelector('#birthday-container')
const birthdayText = document.querySelector('#birthday-text')
const roshChodeshMouseOver =document.querySelector('#find-rosh-chodesh')
const roshChodeshinfo = document.querySelector('#rosh-chodesh-info')
const URI = `https://www.hebcal.com/converter`
const todaysDateStr = new Date().toISOString().slice(0, 10)
const todaysDateDisplayStr = new Date().toString().slice(0, 15)
const todaysDateQuery = `${URI}?cfg=json&date=${todaysDateStr}&g2h=1&strict=1`
let next30daysQuery

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
      const { hm, hd, hy, hebrew } = { ...data }
      cdate.innerText = `${todaysDateDisplayStr}`
      hdate.innerText = `${hm} ${hd}, ${hy} ${hebrew}`
      return { hm, hd, hy }
    })
    .then(({ hm, hd, hy }) => {
      console.log(hd, hm, hy)
      next30daysQuery = `${URI}?cfg=json&hy=${hy}&hm=${hm}&hd=${hd}&h2g=1&ndays=30&strict=1`
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
      addBirthdayToDOM(data)
    })
    .catch(err => console.error(err.message))
}

function addBirthdayToDOM(data) {
  const { hm, hd, hy, hebrew } = { ...data }
  birthdayText.innerText = `Your Hebrew Birthday is ${hm} ${hd}, ${hy} ${hebrew}`
  birthdayDiv.appendChild(birthdayText)
  body.append(birthdayDiv)
}

function formatQueryDate(date) { //takes in 11/22/1988 returns 1988-11-22
  const dateArr = date.split('/')
  const result = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
  return result
}

function findNextRoshChodesh(arr) {
  let roshChodesh
  for (let i = 0; i < arr.length; i++) {
    let date = arr[i][0]
    let events = arr[i][1].events

    for (let j = 0; j < events.length; j++) {
      if (events[j].includes('Rosh')) {
        return roshChodesh = { date, month: arr[i][1].hm }
      }
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const birthday = document.querySelector('input#birthday')
  const timesOfDay = document.querySelectorAll('input[name="time-of-day"]')
  const timeOfDay = radioChecked(timesOfDay)
  const gs = timeOfDay === 'evening' ? 'on' : 'off'
  const qDate = formatQueryDate(birthday.value)
  const qString = `${URI}?cfg=json&date=${qDate}&g2h=1&strict=1&gs=${gs}`//defaults to after 
  
  getHebrewBirthday(qString)
})

roshChodeshMouseOver.addEventListener('mouseover', () => {
  fetch(next30daysQuery)
    .then(res => res.json())
    .then(data => {
      const arrayOfNext30Days = Object.entries(data.hdates) 
      return findNextRoshChodesh(arrayOfNext30Days)
    })
    .then( roshChodesh => {
      let [year, mon, day] = [...roshChodesh.date.split('-')]
      console.log(year, mon, day)
      let date = new Date(year, (mon - 1), day).toString()
      date = date.slice(0,16)
      console.log(date)
      roshChodeshinfo.innerText = `Rosh Chodesh ${roshChodesh.month} is on ${date}`
    })
    .catch(err => console.error(err.message))
})

roshChodeshMouseOver.addEventListener('mouseout', () => {
  roshChodeshinfo.innerText = ''
})
