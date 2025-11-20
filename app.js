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

/*async function loadCategories() {
let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
let data = await res.json();
showCategoryList(data.categories);
showCategoryCards(data.categories);
}
loadCategories();
function showCategoryList(categories) {
let list = document.getElementById("categoryList");
list.innerHTML = categories.map(item => `<li data-cat="${item.strCategory}">${item.strCategory}</li>`).join("");
document.querySelectorAll("#categoryList li").forEach(item => {
item.addEventListener("click", () => searchCategory(item.dataset.cat));
});
}
function showCategoryCards(categories) {
    let cardsDiv = document.getElementById("categoryCards");
    cardsDiv.innerHTML = categories.map(item => `
        <div class="card" onclick="searchCategory('${item.strCategory}')">
            <img src="${item.strCategoryThumb}">
            <h3>${item.strCategory}</h3>
        </div>
    `).join("");
}*/
const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

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

// Call function
fetchCategories();
