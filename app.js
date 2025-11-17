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