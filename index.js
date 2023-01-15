//query select
// <div id="current-date">todays date</div>
const currentDate = document.querySelector('#current-date')
const hdate = document.querySelector('#current-hdate')
const todaysDateStr = new Date().toISOString().slice(0,10)
console.log(todaysDateStr)
const dateURI = `https://www.hebcal.com/converter?cfg=json&date=${todaysDateStr}&g2h=1&strict=1`
//api function to get hebrew date
function getTodaysHebrewDate() {
  fetch(dateURI) 
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const { hm, hd, hy } = { ...data }
    console.log('hm is', hd)
    hdate.innerText = `${hm} ${hd}, ${hy}`
  })
  // append data to div
}
//on DOM load hit api and display today's civil and hebrew date
document.addEventListener('DOMContentLoaded', () => {
  getTodaysHebrewDate()



})

