const unirest = require('unirest');
var API_KEY = "aad4d9f345mshbfe74e4d541f881p148a51jsn8535d35fade1";



module.exports = class RecipeInterface {

    recipeInfo;

    INGREDIENT_LIST = 'beef, duck, turkey, rabbit';
    class() {

    }
    class(ingredients) {
        this.INGREDIENT_LIST = ingredients;
    }
    getRecipe(){
        this.findRecipe();
        console.log(this.recipeInfo);
        return this.recipeInfo;
    }
    findRecipe() {
        var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients");

        req.query({
            "ingredients": this.INGREDIENT_LIST,
            "number": "5",
            "ranking": "1"
        });

        req.headers({
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "useQueryString": true
        });


        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            //TRY CATCH
            var data = JSON.parse(JSON.stringify(res.body));
            var idx = Math.floor(Math.random() * data.length);

            var id = data[idx]['id'];

            //TRY CATCH

            getRecipeInfo(id);
            
            // console.log(recipeInfo.title);
            // console.log(recipeInfo.sourceUrl);
            //TRY CATCH
        });
    }

    setIngredients(ingredients) {
        this.INGREDIENT_LIST = ingredients;
    }


}


function getRecipeInfo(id) {
    var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information");

    req.headers({
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });

    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        this.recipeInfo=JSON.parse(JSON.stringify(res.body));
        // console.log(recipeInfo);
        console.log("HERE");
        
    });
    

    // return recipeInfo;
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