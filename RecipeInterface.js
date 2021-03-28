const PatientMessage = require('./PatientMessage.js');
const unirest = require('unirest');
const e = require('express');
var API_KEY = "aad4d9f345mshbfe74e4d541f881p148a51jsn8535d35fade1";

module.exports = class RecipeInterface {


    INGREDIENT_LIST = 'beef, duck, turkey, rabbit';
    recipeInfo;
    constructor() {
        getRecipeInfo(function (error, recipeInfo) {
            this.recipeInfo=recipeInfo;
            console.log(this.recipeInfo());
        });
        // console.log("CREATED");
    }

    getRecipeTitle(){
        return this.recipeInfo.title;
    }
    getRecipeURL(){
        return this.recipeInfo.sourceUrl;
    }
    getRecipeImage(){
        return this.recipeInfo.image;
    }
    getRecipeSummary(){
        return this.recipeInfo.summary;
    }
    

    setIngredients(ingredients) {
        this.INGREDIENT_LIST = ingredients;
    }


}

function getRecipeInfo(ingredients,callback) {
    findRecipe(ingredients, function (error, id) {
        if (error === null) {
            console.log("ID " + id);
            var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information");

            req.headers({
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "useQueryString": true
            });


            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                var recipeInfo = JSON.parse(JSON.stringify(res.body));

                callback(null,recipeInfo);
            });
        }
    })
}

async function findRecipe(ingredients, callback) {
    var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients");

    req.query({
        "ingredients": ingredients,
        "number": "5",
        "ranking": "1"
    });

    req.headers({
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(async function (res) {
        if (res.error) throw new Error(res.error);
        //TRY CATCH
        var data = JSON.parse(JSON.stringify(res.body));
        console.log(data);
        var idx = Math.floor(Math.random() * data.length);

        var id = data[idx]['id'];
        callback(null, id)
    });
}

function getWineRecommendations() {
    var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing");


    req.query({
        "food": "steak",
        "maxPrice": "50"
    });

    req.headers({
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        // console.log(res.body);
    });
}