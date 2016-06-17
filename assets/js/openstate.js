function startContinuousUpdate(id, interval) {
  updateSpaceState(id);
  setInterval(function () {
    updateSpaceState(id);
  }, interval);
}

var openTextElement =  document.createTextNode("open");
var closedTextElement =  document.createTextNode("open");
var naTextElement =  document.createTextNode("n/a");


function updateSpaceState(id) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', encodeURI('http://spaceapi.hasi.it/'));
  var element = document.getElementById(id);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var spaceapi = JSON.parse(xhr.responseText);
      if (spaceapi.state.open === true) {
        element.removeChild(element.firstChild);
        element.appendChild(openTextElement);
      } else {
        element.removeChild(element.firstChild);
        element.appendChild(closedTextElement);
      }
    } else {
      element.removeChild(element.firstChild);
      element.appendChild(naTextElement);
    }
  }
  xhr.send();
}
