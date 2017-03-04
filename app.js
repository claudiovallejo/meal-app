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
