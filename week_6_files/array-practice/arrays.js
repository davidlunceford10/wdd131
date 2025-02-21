// arrays.js

//Activity 1 - Map
const steps = ["one", "two", "three"];

// Function to wrap a single step in an <li> element
const listTemplate = (step) => {
  return `<li>${step}</li>`;
};

// Use map to convert the list from strings to HTML
const stepsHtml = steps.map(listTemplate).join(""); // Join the <li> elements into a single string

// Set the innerHTML of the element with id "myList"
document.querySelector("#myList").innerHTML = stepsHtml;

//Activity 2 - Map

const grades = ['A', 'B', 'A']

function convertGradeToPoints(grade) {

  
  let gradepoint = 0;

  if (grade === 'A') {
    gradepoint = 4;
  } else if (grade === 'B') {
    gradepoint = 3;
  } else if (grade === 'C') {
    gradepoint = 2;
  }
  return gradepoint;
}

function returnGradeArray(grades) {
  const gpaPoints = grades.map(convertGradeToPoints);
  return gpaPoints;
};


// Activity 3 - Reduce
const grades2 = ['A', 'B', 'C'];

let grades2GpaPoints = returnGradeArray(grades2)

let gpa = grades2GpaPoints.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue
}, 0)/grades2GpaPoints.length;

console.log(gpa)

const food = ['watermelon', 'peach', 'apple', 'tomato', 'grape']

const lessThanSix = food.filter(item => item.length <6);

console.log(lessThanSix);


// Activity 5 - indexOf

const numbers = [12, 34, 21, 54];

let luckyNumber = 21;

isItThere = numbers.indexOf(21);

console.log(isItThere);
