//query select
// <div id="current-date">todays date</div>
const currentDate = document.querySelector('#current-date')
const todaysDate = new Date().toISOString().slice(0,10)
console.log( todaysDate)
const dateURI = `https://www.hebcal.com/converter?cfg=json&date=${todaysDate}&g2h=1&strict=1`
//api function to get hebrew date
function getTodaysHebrewDate() {
  fetch()
}
//on DOM load hit api and display today's civil and hebrew date
document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')
  // getTodaysHebrewDate()



})
// append data to div

