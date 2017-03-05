(function(){
  'use strict';
  
  //  Caching main container/interactive elements
  const $dailyCalories = document.querySelector(`[data-app="total"]`);
  const $refreshButton = document.querySelector(`[data-app="refresh"]`);
  const $container = document.querySelector(`[data-meal="container"]`);
  const $mealTemplate = document.querySelector(`[data-meal="template"]`);

  //  Delete meal template card
  $container.removeChild($mealTemplate);

  //  Meal config
  const mealTypes = ["Snack", "Breakfast", "Snack", "Lunch", "Dinner", "Late Snack"];
  var mealInventory = [];
  var mealHistory = [];
  var mealPlan = [];

  //  Meal Data config
  var req = new XMLHttpRequest();
  req.open("GET", "https://raw.githubusercontent.com/claudiovallejo/meal-app/master/data/meals.json");
  req.send();
  req.addEventListener("load", function(){
    mealInventory = JSON.parse(this.responseText);
    console.log("Sweet! " + mealInventory.length + " meals have been saved!");
  });

  //


})();
