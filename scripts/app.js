(function(){
  'use strict';

  //  Caching main container/interactive elements
  const $dailyCalories = document.querySelector(`[data-app="total"]`);
  const $refreshButton = document.querySelector(`[data-app="refresh"]`);
  const $container = document.querySelector(`[data-meal="container"]`);
  const $mealTemplate = document.querySelector(`[data-meal="template"]`);
  const $span = "<span class=\"f1\">g</span>";

  //  Delete meal template card
  $container.removeChild($mealTemplate);

  //  Meal config
  const mealTypes = ["Snack", "Breakfast", "Lunch", "Dinner", "Late Snack"];
  const mealGuide = ["Snack", "Breakfast", "Lunch", "Snack", "Dinner", "Late Snack"];
  var mealInventory = [];
  var mealPlan = [];

  //  Meal Data config
  var req = new XMLHttpRequest();
  req.open("GET", "https://raw.githubusercontent.com/claudiovallejo/meal-app/master/data/meals.json");
  req.send();
  req.addEventListener("load", function() {
    dataCataloger(JSON.parse(this.responseText));
  });

  //  Refresh Button
  $refreshButton.addEventListener('click', function(){
    var $meals = $container.children;
    $container.innerHTML = '';
    mealSelector();
    createMealCards();
  });

  //  Organizes meal data into a list of objects separated by meal type
  function dataCataloger(meals) {
    mealTypes.forEach(function(type) {
      var obj = {};
      obj.type = type;
      obj.meals = [];
      meals.forEach(function(meal) {
        if (meal.type === type)
          obj.meals.push(meal);
      });
      mealInventory.push(obj);
    });
    mealSelector();
    createMealCards();
  }

  //  Selects meal plan
  function mealSelector() {
    mealPlan = [];
    mealGuide.forEach(function(type) {
      var typeObj = fetchMealsByType(type);
      var meals = typeObj.meals;
      if (meals.length > 0) {
        var ri = Math.floor(Math.random() * meals.length);  //  ri => random index
        mealPlan.push(meals[ri]);
      }
    });
  }

  //  Fetches meal type object from inventory
  function fetchMealsByType(type) {
    var object;
    mealInventory.forEach(function(obj) {
      if (obj.type === type)
        object = obj;
    });
    return object;
  }

  //  Populate meal cards
  function createMealCards() {
    //  Calculate total meal plan calories
    var dailyTotal = 0;
    mealPlan.forEach(function(meal) {
      dailyTotal += totalCalories(meal.macros);
    });
    $dailyCalories.textContent = concat((numberWithCommas(dailyTotal.toFixed(1))), "Cal");
    //  Populate and append a meal card for each meal in the mealPlan array
    for (var i = 0; i < mealPlan.length; i++) {
      //  Initialize meal and card variables
      var meal = mealPlan[i];
      var $card = $mealTemplate.cloneNode(true);
      //  Populate meal card
      $card.classList.toggle('o0');
      $card.setAttribute('style', `transition-delay: ${i*0.1}s`);
      $card.querySelector(`[data-meal="name"]`).textContent = meal.name;
      $card.querySelector(`[data-meal="total"]`).textContent = concat((totalCalories(meal.macros)).toFixed(1), "Cal");
      $card.querySelector(`[data-meal="type"]`).textContent = `Meal #${i+1}, ` + meal.type;
      $card.querySelector(`[data-meal="value"]`).textContent = Math.floor((totalCalories(meal.macros) / dailyTotal) * 100) + "% DV";
      $card.querySelector(`[data-meal="protein"]`).innerHTML = (meal.macros.protein).toFixed(1) + $span;
      $card.querySelector(`[data-meal="carbs"]`).innerHTML = (meal.macros.carbs).toFixed(1) + $span;
      $card.querySelector(`[data-meal="fat"]`).innerHTML = (meal.macros.fat).toFixed(1) + $span;
      $card.querySelector(`[data-meal="ingredients"]`).textContent = transformList(meal.ingredients);
      //  Append meal card to container
      $container.appendChild($card);
    }
  }

  //  Calculates a meal's total caloric content
  function totalCalories(macros) {
    var total = 0;
    total += macros.protein * 4;
    total += macros.carbs * 4;
    total += macros.fat * 9;
    return total;
  }

  //  Concatenates two strings separated by a space
  function concat(a, b) {
    return a + " " + b;
  }

  //  Formats any number with appropriate commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //  Concatenates an array of strings into a single string
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

})();
