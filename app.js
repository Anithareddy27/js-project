
// menu open/close
menuBtn.addEventListener("click", () => {// elements
let menuBtn = document.getElementById('menuBtn');
let closeBtn = document.getElementById('closeBtn');
let sideMenu = document.getElementById('sideMenu');
let details = document.getElementById('details');
let cardsContainer = document.getElementById('cardsContainer');
let menuList = document.getElementById('menuList');
let mealsContainer = document.getElementById('mealsContainer');
let categoryDetails = document.getElementById('categoryDetails');
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let homeBtn = document.getElementById('homeBtn');
let categoriesData = {};

// menu open/close
menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("open");
  details.classList.add("show");
});
closeBtn.addEventListener("click", closeMenu);
details.addEventListener("click", closeMenu);

function closeMenu() {
  sideMenu.classList.remove("open");
  details.classList.remove("show");
}

// Home
homeBtn.addEventListener("click", () => {
  cardsContainer.style.display = "grid";
  mealsContainer.style.display = "none";
  categoryDetails.hidden = true;
  mealsContainer.innerHTML = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// load categories
async function loadCategories() {
  let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  let data = await res.json();
  categoriesData = data.categories.reduce((acc, c) => {
    acc[c.strCategory] = c.strCategoryDescription;
    return acc;
  }, {});

  cardsContainer.innerHTML = data.categories.map(cat => `
    <div class="card" data-cat="${cat.strCategory}">
      <span class="label">${cat.strCategory}</span>
      <img src="${cat.strCategoryThumb}">
      <h3>${cat.strCategory}</h3>
    </div>
  `).join("");

  menuList.innerHTML = data.categories.map(c => `<li>${c.strCategory}</li>`).join("");

  document.querySelectorAll(".card").forEach(card =>
    card.addEventListener("click", () => openCategory(card.dataset.cat)));

  document.querySelectorAll("#sideMenu ul li").forEach(li =>
    li.addEventListener("click", () => openCategory(li.innerText.trim())));
}

// open a category
async function openCategory(catName) {
  cardsContainer.style.display = "none";          
  mealsContainer.style.display = "flex";          
  categoryDetails.hidden = false;

  categoryDetails.innerHTML = `<h2>${catName}</h2><p>${categoriesData[catName]}</p>`;
  mealsContainer.innerHTML = "Loading...";

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
  let d = await res.json();

  mealsContainer.innerHTML = d.meals.map(m => `
    <div class="meal-card" data-id="${m.idMeal}">
      <div class="thumb-wrap">
        <img src="${m.strMealThumb}">
        <span class="cat-badge">${catName}</span>
      </div>
      <div class="meal-info"><h3>${m.strMeal}</h3></div>
    </div>
  `).join("");

  document.querySelectorAll(".meal-card").forEach(card =>
    card.addEventListener("click", () => showMealById(card.dataset.id)));

  closeMenu();
}

// full meal
async function showMealById(id) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let d = await res.json();
  let m = d.meals[0];

  let ingredients = Array.from({ length: 20 }, (_, i) => ({
    ing: m[`strIngredient${i+1}`],
    measure: m[`strMeasure${i+1}`]
  })).filter(x => x.ing);

  mealsContainer.style.display = "none";
  categoryDetails.innerHTML = `
    <h2>${m.strMeal}</h2>
    <img class="detail-img" src="${m.strMealThumb}">
    <h3>Ingredients</h3>
    <ul class="ingredients-list">
      ${ingredients.map(i => `<li>${i.ing} — ${i.measure}</li>`).join("")}
    </ul>
    <h3>Instructions</h3>
    <p>${m.strInstructions}</p>
  `;
}

// search
searchBtn.addEventListener("click", async () => {
  let q = searchInput.value.trim();
  if (!q) return;

  cardsContainer.style.display = "none";
  mealsContainer.style.display = "flex";
  categoryDetails.hidden = true;
  mealsContainer.innerHTML = "Searching...";

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
  let d = await res.json();
  let m = d.meals?.[0];

  if (!m) {
    mealsContainer.innerHTML = `<div>No meal found</div>`;
    return;
  }

  mealsContainer.innerHTML = `
    <div class="meal-card" data-id="${m.idMeal}">
      <div class="thumb-wrap"><img src="${m.strMealThumb}">
      <span class="cat-badge">${m.strCategory}</span></div>
      <div class="meal-info"><h3>${m.strMeal}</h3></div>
    </div>
  `;
  document.querySelector(".meal-card")
    .addEventListener("click", () => showMealById(m.idMeal));
});

loadCategories();

  sideMenu.classList.add("open");
  details.hidden = false;
  details.classList.add("show");
});
closeBtn.addEventListener("click", () => closeMenu());
details.addEventListener("click", () => closeMenu());
function closeMenu() {
sideMenu.classList.remove("open");
details.classList.remove("show");
setTimeout(() => details.hidden = true, 220);
}
// Home click
homeBtn.addEventListener("click", () => {
cardsContainer.style.display = "grid";
mealsContainer.style.display = "none";
categoryDetails.hidden = true;
mealsContainer.innerHTML = "";
window.scrollTo({ top: 0, behavior: "smooth" });
});
// load categories
async function loadCategories() {
  try {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await res.json();
    if (!data?.categories) return;
    categoriesData = data.categories.reduce((acc, c) => {
      acc[c.strCategory] = c.strCategoryDescription || "";
      return acc;
    }, {});
    cardsContainer.innerHTML = data.categories
  .map(cat => `
    <div class="card" data-cat="${cat.strCategory}">
      <span class="label">${cat.strCategory}</span>
      <img src="${cat.strCategoryThumb}">
      <h3>${cat.strCategory}</h3>
    </div>
  `)
  .join("");
// Click event for cards
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => openCategory(card.dataset.cat));
});
// Side menu click event
document.querySelectorAll("#sideMenu ul li").forEach(li => {
  li.style.cursor = "pointer";
  li.addEventListener("click", () => openCategory(li.innerText.trim()));
});
  } catch (err) {
    console.error("categories load failed", err);
  }
}
// open a category
async function openCategory(catName) {
  cardsContainer.style.display = "none";          
  mealsContainer.style.display = "flex";          
  categoryDetails.hidden = false;

  categoryDetails.innerHTML = `
    <h2>${(catName)}</h2>
    <p>${(categoriesData[catName] || "")}</p>
  `;
  mealsContainer.innerHTML = "Loading...";
  try {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(catName)}`);
    let d = await res.json();
    if (!d.meals) {
      mealsContainer.innerHTML = `<div class="no-found">No meals found</div>`;
      return;
    }
    mealsContainer.innerHTML = d.meals
      .slice(0, 50)
      .map(m => `
        <div class="meal-card" data-id="${m.idMeal}">
          <div class="thumb-wrap">
            <img src="${m.strMealThumb}">
            <span class="cat-badge">${(catName)}</span>
          </div>
          <div class="meal-info">
            <h3 class="meal-title">${(m.strMeal)}</h3>
          </div>
        </div>
      `)
      .join("");
    document.querySelectorAll(".meal-card").forEach(card =>
      card.addEventListener("click", () => showMealById(card.dataset.id))
    );
  } catch (err) {
    console.error("category meals failed", err);
    mealsContainer.innerHTML = "Failed to load meals.";
  }
  closeMenu();
}
// show full meal
async function showMealById(id) {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
    );
    let d = await res.json();
    let m = d.meals?.[0];
    if (!m) return;
    let ingredients = Array.from({ length: 20 }, (_, i) => ({
      ing: m[`strIngredient${i + 1}`],
      measure: m[`strMeasure${i + 1}`]
    })).filter(x => x.ing);
    mealsContainer.style.display = "none";      // hide meals on details open
    categoryDetails.hidden = false;
    categoryDetails.innerHTML = `
      <h2>${(m.strMeal)}</h2>
      <img class="detail-img" src="${m.strMealThumb}">
      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        ${ingredients
          .map(it => `<li>${(it.ing)} — ${(it.measure)}</li>`)
          .join("")}
      </ul>
      <h3>Instructions</h3>
      <p>${(m.strInstructions)}</p>
    `;
    window.scrollTo({ 
      top: categoryDetails.offsetTop - 20, 
      behavior: "smooth"
     });
  } catch (err) {
    console.error("lookup failed", err);
  }
}
// search
searchBtn.addEventListener("click", async () => {
  let q = searchInput.value.trim();
  if (!q) return;
  mealsContainer.style.display = "grid";
  cardsContainer.style.display = "none";
  categoryDetails.hidden = true;
  document.querySelector(".meals-title")?.remove();
  mealsContainer.innerHTML = "Searching...";
  try {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
    let d = await res.json();
    let m = d.meals?.[0];
    if (!m) {
      mealsContainer.innerHTML = `<div>No meal found</div>`;
      return;
    }
    mealsContainer.innerHTML = `
      <div class="meal-card" data-id="${m.idMeal}">
        <div class="thumb-wrap">
          <img src="${m.strMealThumb}">
          <span class="cat-badge">${(m.strCategory)}</span>
        </div>
        <div class="meal-info"><h3>${(m.strMeal)}</h3></div>
      </div>
    `;
    document.querySelector(".meal-card")
      ?.addEventListener("click", () => showMealById(m.idMeal));
  } catch (err) {
    mealsContainer.innerHTML = "Search failed";
  }
});
// init
loadCategories();
