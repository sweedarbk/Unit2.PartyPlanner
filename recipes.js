const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-pt'

async function logAsync(func) {
    const result = await func();
    console.log(result);
}

// get recipes
async function getRecipes() {
    const response = await fetch(`${baseURL}/recipes`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error);
    }

    return json.data;
}

// logAsync(getRecipes)

// create a recipe
async function createRecipe(recipe) {
    const response = await fetch(`${baseURL}/recipes`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe),
    });
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error.message);
    }

    return json.data;
}

// logAsync(() => createRecipe({
//     name: "Pizza",
//     imageUrl: "https://www.stevospizzeria.com/images/home-full.jpg",
//     description: "Pure itailian goodness"
// }));

// get a single recipe
async function getRecipe(id) {
    const response = await fetch(`${baseURL}/recipes/${id}`);
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error.message);
    }

    return json.data;
}

// logAsync(() => getRecipe(345));

// update recipe
async function updateRecipe(id, recipe) {
    const response = await fetch(`${baseURL}/recipes/${id}`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe),
    });
    const json = await response.json();

    if(!json.success) {
        throw new Error(json.error.message);
    }

    return json.data;
}

// logAsync(() => updateRecipe(345, {
//     name: 'Pepperoni Pizza'
// }));

// delete recipe
async function deleteRecipe(id) {
    const response = await fetch(`${baseURL}/recipes/${id}`, {
        method: 'delete'
    });

    if(response.status === 204) {
        return true;
    }

    throw new Error(`unable to remove receipe with id ${id}`);
}

// logAsync(() => deleteRecipe(345));

function addRecipeToScreen(r) {
    const recipesElement = document.getElementById('recipes');
    const elem = document.createElement('div');
        elem.classList.add('recipe')

        const nameElem = document.createElement('div');
        nameElem.classList.add('name')
        nameElem.append(r.name)
        const descriptionElem = document.createElement('div');
        descriptionElem.classList.add('description')
        descriptionElem.append(r.description)

        elem.append(nameElem);
        elem.append(descriptionElem);

        recipesElement.append(elem);
}

document.addEventListener('DOMContentLoaded', async () => {
    const recipes = await getRecipes();

    recipes.forEach(r => {
        addRecipeToScreen(r);
    });

    const form = document.getElementById('recipeForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name');
        const image = document.getElementById('image');
        const description = document.getElementById('description');

        const recipe = {
            name: name.value,
            imageUrl: image.value,
            description: description.value,
        };

        try {
            const newRecipe = await createRecipe(recipe);
            // add the new recipe to the screen
            addRecipeToScreen(newRecipe);
        } catch(err){ 
            console.error(err);
        }
    })
})