var input = document.querySelector('input')
var button = document.querySelector('button')

function sendData(data) {
  input.value = '';
  console.log(data)
  
  var url = window.location.href

  fetch(url + 'api/url', {
    headers: { "Content-Type": "application/json" },
    method:'POST',
    body: JSON.stringify({
      "url":data
    })
  })
}

button.addEventListener('click', (e) => {
  e.preventDefault()
  sendData(input.value)
})

input.addEventListener('keyup', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    sendData(input.value)
  }
})
