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
  const mealGuide = ["Snack", "Breakfast", "Snack", "Lunch", "Dinner", "Late Snack"];
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
    var dailyTotal = 0;
    for (var i = 0; i < mealPlan.length; i++) {
      var meal = mealPlan[i];
      var $card = $mealTemplate.cloneNode(true);
      $card.querySelector(`[data-meal="name"]`).textContent = meal.name;
      $card.querySelector(`[data-meal="total"]`).textContent = concat((totalCalories(meal.macros)).toFixed(1), "Cal");
      $card.querySelector(`[data-meal="type"]`).textContent = meal.type;
      $card.querySelector(`[data-meal="protein"]`).innerHTML = (meal.macros.protein).toFixed(1) + $span;
      $card.querySelector(`[data-meal="carbs"]`).innerHTML = (meal.macros.carbs).toFixed(1) + $span;
      $card.querySelector(`[data-meal="fat"]`).innerHTML = (meal.macros.fat).toFixed(1) + $span;
      $card.querySelector(`[data-meal="ingredients"]`).textContent = transformList(meal.ingredients);
      //
      dailyTotal += totalCalories(meal.macros);
      //
      $container.appendChild($card);
    }
    //
    $dailyCalories.textContent = concat((numberWithCommas(dailyTotal.toFixed(1))), "Cal");
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
