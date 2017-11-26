var input = document.querySelector('input')
var button = document.querySelector('button')
var error = document.getElementById('error')
var result = document.getElementById('result')

function sendData(data) {
  input.value = '';
  
  var url = window.location.href

  fetch(url + 'api/url', {
    headers: { "Content-Type": "application/json" },
    method:'POST',
    body: JSON.stringify({
      "url":data,
      "currentUrl":url
    })
  })
  .then(data => data.json())
  .then((json) => {
    var respUrl = json.url
    result.innerHTML = respUrl
    result.style.display = 'block'
  })
} 

function errorMessage() {
  error.style.display = 'block';
}

button.addEventListener('click', (e) => {
  e.preventDefault()

  if (input.value != '' || input.value != '') {
    sendData(input.value)
    error.style.display = 'none';
  } else {
    errorMessage()
  }
})

input.addEventListener('keyup', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    if (input.value != '' || input.value != '') {
      sendData(input.value)
      error.style.display = 'none';
    } else {
      errorMessage()
    }
  }
})

