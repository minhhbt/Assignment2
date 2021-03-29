const RecipeInterface=require('./RecipeInterface');

var recipeInterface=new RecipeInterface();

recipeInterface.init().then(function(){
console.log(recipeInterface.getRecipeTitle());
console.log(recipeInterface.recipeInfo);
});
