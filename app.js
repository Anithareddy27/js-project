// -------- Sidebar Menu Open / Close ---------
let openmenu = document.getElementById('openMenu');
let sidebar = document.getElementById('sidebar');
let closeBtn = document.getElementById('closeBtn');

openmenu.addEventListener('click', () => {
  sidebar.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  sidebar.style.right = "-350px";
});
/*--search items--*/
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchbtn");
let mealsContainer = document.getElementById("mealsContainer");

searchBtn.addEventListener("click", () => {
    const foodName = searchInput.value.trim();
    if (foodName) {
        searchMeals(foodName);
    }
});

async function searchMeals(foodName) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.log("Error:", error);
    }
}

function displayMeals(meals) {
    mealsContainer.innerHTML = "";

    if (!meals) {
        mealsContainer.innerHTML = "<h2>No Meals Found!</h2>";
        return;
    }

    meals.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("meals-card");
        card.innerHTML = `
            <img src="${item.strMealThumb}" alt="${meal.strMeal}">
            <h3>${item.strMeal}</h3>
            <p>${item.strCategory}</p>
        `;

        mealsContainer.appendChild(card);
    });
}

// When clicking MealFinder heading -> show categories again
let mealFinderHead = document.getElementById("mhead");
mealFinderHead.addEventListener("click", () => {
  document.querySelector(".category-section").style.display = "block"; 
  document.querySelector(".meals").style.display = "none";
});

// -------------- Fetch Category Images ---------------
async function fetchCategories() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await response.json();
  displayCategories(data.categories);
}

function displayCategories(categories) {
  const container = document.getElementById("categories");

  container.innerHTML = categories.map(cat => {
    return `
      <div class="card" onclick="searchitem('${cat.strCategory}')">
        <div class="tag">${cat.strCategory}</div>
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
      </div>
    `;
  }).join("");
}

fetchCategories();

// -------------- Load Meals ----------------
async function searchitem(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMeals(data.meals);

  // Hide category section and show meals
  document.querySelector(".category-section").style.display = "none";
  document.querySelector(".meals").style.display = "block";
}

function displayMeals(meals) {
  const container = document.getElementById("mealsContainer");
  container.innerHTML = meals.map(meal => {
    return `
      <div class="meal-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h4>${meal.strMeal}</h4>
      </div>
    `;
  }).join("");
}
