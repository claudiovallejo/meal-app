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
  const mealTypes = ["Snack", "Breakfast", "Lunch", "Dinner", "Late Snack"];
  const mealGuide = ["Snack", "Breakfast", "Snack", "Lunch", "Dinner", "Late Snack"];
  var mealInventory = [];
  var mealPlan = [];

  //  Meal Data config
  var req = new XMLHttpRequest();
  req.open("GET", "https://raw.githubusercontent.com/claudiovallejo/meal-app/master/data/meals.json");
  req.send();
  req.addEventListener("load", function(){
    mealCataloger(JSON.parse(this.responseText));
    console.log(mealInventory);
  });

  //  Organizes meal inventory into a list of objects separated by meal type
  function mealCataloger(meals) {
    mealTypes.forEach(function(type){
      var obj = {};
      obj.type = type;
      obj.meals = [];
      meals.forEach(function(meal){
        if (meal.type === type)
          obj.meals.push(meal);
      });
      mealInventory.push(obj);
    });
  }

})();
