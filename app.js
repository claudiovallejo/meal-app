(function() {
  'use strict';

  //  Caching container and template card
  var $container = document.querySelector('.js-container');
  var $template = document.querySelector('.js-template');
  var $header = document.querySelector('.js-header');
  //  Deleting template card
  $container.removeChild($template);

  //  Fetch meal JSON data
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "https://raw.githubusercontent.com/claudiovallejo/meal-app/master/meals.json");
  oReq.send();

  //  Meal Plan Arrays
  var mealInventory = [];
  var mealHistory = [];
  var mealPlan = [];

  //  Plan meal type order
  const mealTypes = ["Snack", "Breakfast", "Snack", "Lunch", "Dinner", "Snack"];

  //  Select meals function
  function selectMeals(meals) {
    var numberOfMeals = meals.length;
    for (var i = 0; i < mealTypes.length; i++) {
      var randomIndex = Math.floor(Math.random() * meals.length);
      var randomMeal = meals[randomIndex];
      udpateMeal(randomMeal);
    }
    calculateTotals();
  }

  //  Filters meals by type
  function typeFilter(type) {
    var meals = [];
    mealInventory.forEach(function(meal) {
      if (meal.type === type)
        meals.push(meal);
    });
    return meals;
  }

  //  Assign data to meals variable
  function reqListener() {
    mealInventory = JSON.parse(this.responseText);
    selectMeals(mealInventory);
  }

  //  Update card contents
  function udpateMeal(meal) {
    var $card = $template.cloneNode(true);
    $card.classList.remove('js-template');
    $card.classList.add('js-card');
    $card.querySelector('.js-name').textContent = meal.name;
    $card.querySelector('.js-total').textContent = appendCalories(Math.floor(totalCalories(meal.macros.protein, meal.macros.carbs, meal.macros.fat)));
    $card.querySelector('.js-type').textContent = meal.type;
    $card.querySelector('.js-protein').innerHTML = (meal.macros.protein).toFixed(1) + "<span class=\"f1\">g</span>";
    $card.querySelector('.js-carbs').innerHTML = (meal.macros.carbs).toFixed(1) + "<span class=\"f1\">g</span>";
    $card.querySelector('.js-fat').innerHTML = (meal.macros.fat).toFixed(1) + "<span class=\"f1\">g</span>";
    $card.querySelector('.js-ingredients').textContent = transformList(meal.ingredients);
    $container.appendChild($card);
    mealPlan.push(meal);
  }

  //
  function totalCalories(protein, carbs, fat) {
    var total = 0;
    total += protein * 4;
    total += carbs * 4;
    total += fat * 9;
    return total.toFixed(1);
  }

  //
  function appendCalories(value) {
    return value + " Cal";
  }

  function calculateTotals() {
    //
    var dailyCalories = 0;
    //
    mealPlan.forEach(function(meal){
      dailyCalories += Math.floor(totalCalories(meal.macros.protein, meal.macros.carbs, meal.macros.fat));
    });
    $header.querySelector('.js-total').textContent = appendCalories(numberWithCommas(dailyCalories));
  }

  //
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //
  function transformList(list) {
    var string = "";
    for (var i = 0; i < list.length; i++) {
      if (i != list.length - 1) {
        string += list[i] + ", ";
      } else {
        string += list[i];
      }
    }
    return string;
  }

  //  Refresh Action
  const $refresh = document.getElementsByClassName('js-refresh')[0];
  if ($refresh){
    $refresh.addEventListener('click', function(){
      selectMeals(mealInventory);
    });
  }

})();
