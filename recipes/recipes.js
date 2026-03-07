const recipeDescription = document.querySelector("#recipe-description");

function updateDescription() {
  if (window.innerWidth >= 700) {
    recipeDescription.innerText = "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.";
  } else {
    recipeDescription.innerText = "";
  }
}

updateDescription(); // run on page load
window.addEventListener("resize", updateDescription); // run when screen resizes
