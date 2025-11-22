let openmenu=document.getElementById('openMenu')
let sidebar=document.getElementById('sidebar')
let closeBtn=document.getElementById('closeBtn')

openmenu.addEventListener('click',()=>{
sidebar.style.right = "0";
sidebar.style.display = "block";
})
closeBtn.addEventListener("click", () => {
categoryList.style.display="none" 
setTimeout(() => {
sidebar.style.display = "none";
}, 300);
});
let mealFinderHead = document.getElementById("mhead");

mealFinderHead.addEventListener("click", () => {
    fetchCategories(); 
    sidebar.style.display = "none"; 
});

let apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
async function fetchCategories() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        console.log("Error:", error);
    }
}
function displayCategories(categories) {
    const container = document.getElementById("categoryContainer");
    const cards = categories.map(cat => {
        return `
            <div class="card">
            <div class="tag">${cat.strCategory}</div>
            <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
            </div>
        `;
    });

    container.innerHTML = cards.join("");
}
fetchCategories();

// Fetch meals by category

async function searchitem(category) {
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
let data=await response.json()
  displayMeals(data.meals)
}
function displayMeals(meals){
let container=document.getElementById('categoryContainer');
 container.innerHTML=meals.map(item=>{
return`
<div class="meal-card'>
<img src="${item.strMealThumb}">
<h3>${item.strMeal}</h3>
</div>
`
 }).join(" ");

}