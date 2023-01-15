//query select
// <div id="current-date">todays date</div>
const currentDate = document.querySelector('#current-date')
const cdate = document.querySelector('#current-civil-date')
const hdate = document.querySelector('#current-hdate')
const form = document.querySelector('#birthday-calc')

const todaysDateQueryStr = new Date().toISOString().slice(0, 10)
const todaysDateDisplayStr = new Date().toString().slice(0, 15)

const dateURI = `https://www.hebcal.com/converter?cfg=json&date=${todaysDateQueryStr}&g2h=1&strict=1`
//api function to get hebrew date
function getTodaysHebrewDate() {
  fetch(dateURI)
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

//on Form submit get birthday info
// console.log('form is, ', form)
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const birthday = document.querySelector('input#birthday')
  const timesOfDay = document.querySelectorAll('input[name="time-of-day"]')
  console.log(timesOfDay)
  //find from nodeList timesOfDay which radio button is selected.
  const timeOfDay = radioChecked(timesOfDay)
  console.log(timeOfDay)
})

function radioChecked(nodeList) {
  const nodes = Array.from(nodeList)
  const found = nodes.find(input => input.checked === true)
  console.log('found is', found.value)
  // find which input has a checked value of true
  //return the inputs value
  return found.value
}