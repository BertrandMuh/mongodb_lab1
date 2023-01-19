console.log("js file connected");


let submitButton = document.getElementById('submit-button');


let displayPageButton = document.getElementById('fruit-page-button');

displayPageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_fruits"
})

let displayVeggiePageButton = document.getElementById('veggie-page-button');

displayVeggiePageButton.addEventListener('click', () => {
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_veggies"
})