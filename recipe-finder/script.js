let recipes;

async function getRecipes()
{
    const food_api = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search.value;

    if (search.value == "") {
        document.getElementById("recipes").innerHTML = "";
        document.getElementById("main").style.width = "600px";
        return;
    }

    try {
        const response = await fetch(food_api);
        const data = await response.json();

        if (data.meals.length > 0)
        {
            document.getElementById("recipes").innerHTML = "";
            document.getElementById("main").style.width = "1300px";
            displayRecipes(data);
        }
    } catch(error){ }
}
function displayRecipes(data)
{
    recipes = data;
    for (let i = 0; i < data.meals.length; i++)
    {
        const meal = data.meals[i];
        let mainDiv = document.createElement('div');
        let name = document.createElement('h2');
        let img = document.createElement('img');

        img.src = meal.strMealThumb + "/medium";
        img.value = i;
        
        img.addEventListener('click', () => {
            const val = img.value;

            displayInformation(val);
        });


        name.innerText = meal.strMeal;

        mainDiv.appendChild(name);
        mainDiv.appendChild(img);

        document.getElementById("recipes").appendChild(mainDiv);
    }
}

function displayInformation(num)
{
    const meal = recipes.meals[num];

    document.getElementById('modal').style.display = "grid";
            
    document.getElementById("modalImg").src = meal.strMealThumb + "/large";


    let mealName = document.createElement('span');
    mealName.innerHTML = meal.strMeal;

    let info = document.getElementById("info");
    info.appendChild(mealName);

    const splitGuide = meal.strInstructions.split("\r\n");
    splitGuide.forEach(element => {
        let instruction = document.createElement('p');
        instruction.innerHTML = element;
        info.appendChild(instruction);
    });


    let ingredients = document.createElement('ul');


    let i = 1;
    while(true)
    {
        const ingredient = meal['strIngredient' + i]
        if (ingredient)
        {
            const measure = meal['strMeasure' + i]
            let newLi = document.createElement('li');
            newLi.innerHTML = ingredient + " - " + measure;
            ingredients.appendChild(newLi);
        }
        else {
            break;
        }
        i++;
    }



    info.appendChild(ingredients);
}

function closeModal()
{
    document.getElementById('modal').style.display = "none";
    document.getElementById('info').innerHTML = "";
}