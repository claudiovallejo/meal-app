//  On Document Load
var $cards = document.getElementsByClassName('js-card');
if ($cards.length > 0) {
  window.addEventListener('load', function(){
    for (var i = 0; i < $cards.length; i++) {
      toggle($cards[i], 'o0', 'o1');
      toggle($cards[i], 'transform-tYm1_5', 'transform-tY0');
      $cards[i].setAttribute("style", "transition-delay: " + (i * 0.25) + "s");
    }
  });
}
//  Toggle Class Function
function toggle($element, classA, classB) {
  $element.classList.toggle(classA);
  $element.classList.toggle(classB);
}
//  Refresh Action
const $refresh = document.getElementsByClassName('js-refresh')[0];
if ($refresh){
  $refresh.addEventListener('click', function(){
    console.log("REFRESH");
  });
}
//  Fetch meal JSON data
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://raw.githubusercontent.com/claudiovallejo/meal-app/master/meals.json");
oReq.send();
//  Assign data to meals variable

function reqListener() {
  var meals = JSON.parse(this.responseText);
  fetchHTML(meals);
}
//
var $main = document.getElementsByClassName('js-main')[0];
//
function fetchHTML(data) {
  for (var i = 0; i < data.length; i++) {
    const $article = document.createElement('article');
    $article.setAttribute('class', 'js-card function-eio duration0_5 property-all o0 transform-tYm1_5 pa1_5 bg-white');
    if (i != data.length) {
      $article.classList += "mb1"
    }
  }
}
