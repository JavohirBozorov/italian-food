document.getElementById("myButton").onclick = function() {
    let nameOfMeal = document.getElementById("mealName").value;
    if(nameOfMeal != ""){
        // console.log("Your meal name is",nameOfMeal);
        // document.querySelector("#meal").innerHTML = `${nameOfMeal} is not found. Please enter other food name`;
        loadMeals();
    } else {
        document.getElementById("meal").innerHTML = "Please enter any meal name!";
        document.getElementById("meals").innerHTML = "";
    }
}

const createRecipeCard = ({ recipe }) => {
    return `
    <div class="card text-center mb-5">
        <img src="${recipe.image}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title"><b>${recipe.label}</b></h5>
            <h5 class="card-dish-type"><b>Dish-type:</b> ${recipe.dishType}</h5>
            <h6 class="card-text mb-3"><b>Diet Labels:</b> ${recipe.dietLabels}</h6>
            <h5 class="card-text">Weight: ${Math.trunc(recipe.calories)}</h5>
            <a href="${recipe.url}" class="btn btn-primary "><b>Source</b></a>
        </div>
    </div>
    `;
}


function loadMeals() {
    let load1 = new XMLHttpRequest();
    let nameOfMeal = document.getElementById("mealName").value;
    let APP_ID = "4b0b39d1";
    let API_KEY = "651101c0b56840e5cdbf17d71b562fb8";
    let main_link = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${nameOfMeal}&from=0&to=50`;
    
    load1.open('GET', main_link, true);
    
    load1.onload = function () {
        if (this.status !== 200) {
            return;
        }
        
        const { hits: meals, count } = JSON.parse(this.responseText);

        if (count < 1) {
            document.querySelector('#meal').innerHTML = (`${nameOfMeal} is not found. Please enter other food name`);
            return;
        }

        const outputHtml = meals.map(createRecipeCard).join("\n");

        document.querySelector("#meals").innerHTML = outputHtml;
        document.querySelector("#meal").innerHTML = '';
    }

    load1.send();
}