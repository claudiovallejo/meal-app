# Meal Plan Generator
Over the weekend (Fri Mar 3 -> Sun Mar 5) my brother and I worked on a simple site that generates random, daily meal plans. My brother is currently following a specific diet and the diet is composed of a very limited set of foods. My brother came up with the idea of creating a site/app that randomly selected a meal to automate his meal selection process and to make his diet less monotonous.

This project is currently a simple static site built with HTML/CSS/JS. My brother's meal plan is stored in a JSON file that feeds the site's content. Unfortunately the site doesn't save any data, so it makes the site quite useless right now. I've been doing some research about service workers to store the site's data on the device, which would make the app useful.

I learned several new things while building the app, and building this app peaked my curiosity to build a more complex app where my brother can add new meals through the app, save favorite meal plans, among other things.

# Personalizing the App
If you're interested in having the app generate random meals based on your diet, follow the next 5 steps—

1. Clone the repository

2. Update `data/meals.json` with your own meals

3. In `scripts/app.js` update `mealTypes` and `mealGuide`. `mealTypes` is a list of the available meal types. `mealGuide` defines the order and type of meals the generator creates for your daily meals.

4. Update the `XMLHttpRequest().open` path in `scripts/app.js`. I'm currently using GitHub's raw data file path (you find this path after cloning the project and hosting on your GitHub account, opening the project's `data/meals.json` file, and selecting 'Raw' next to the 'Blame' and 'History' buttons.)

5. Publish site

PS — I highly recommend hosting on [Netlify](https://www.netlify.com/). All you have to do is create an account, create a new project, and link the GitHub repo with your Netlify project. The site will automatically update with `git push origin master`.

If you have any questions or suggestions let me know [@claudiovallejop](https://twitter.com/claudiovallejop).

# Sample Meal API
```json
{
  "name": "Banana Pancakes",
  "type": "Breakfast",
  "macros": {
    "fat": 15.50,
    "protein": 34.00,
    "carbs": 21.00
  },
  "ingredients": [
    "1 Tbsp of Peanut Butter",
    "1 Cup of Almond Milk",
    "33g of Whey Protein"
  ]
}
```
