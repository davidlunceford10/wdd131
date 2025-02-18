const inputSelector = document.getElementById('grades');
const submitButton = document.getElementById('submitButton');
const output = document.getElementById('output');

function getGrades () {
    const gradesText = inputSelector.value.toUpperCase();
    const gradesArray = gradesText.split(',').map(grade => grade.trim());
    return gradesArray
}

function lookupGrade(gradesArray) {
    let gradeList = [];
    let gradePoint = 0;

    for (const grade of gradesArray) { 
        if (grade === 'A' || grade === 'A+') {
            gradePoint = 4.0;
        } else if (grade === 'A-') {
            gradePoint = 3.7;
        } else if (grade === 'B+') {
            gradePoint = 3.3;
        } else if (grade === 'B') {
            gradePoint = 3.0;
        } else if (grade === 'B-') {
            gradePoint = 2.7;
        } else if (grade === 'C+') {
            gradePoint = 2.3;
        } else if (grade === 'C') {
            gradePoint = 2.0;
        } else if (grade === 'C-') {
            gradePoint = 1.7;
        } else if (grade === 'D') {
            gradePoint = 1.0;
        } else if (grade === 'F') {
            gradePoint = 0.0;
        } else {
            continue; 
        }
        gradeList.push(gradePoint);
    }

    return gradeList;
}


function calculateGpa(gradeList) {
    let sum = 0;
    let classCount = 0;

    gradeList.forEach(num => {
        sum += num;
        classCount += 1;
    });
    
    gpa = sum / classCount;
    
    return gpa;
}

function outputGpa(gpa, selector){
    const outputValue = document.getElementById('output');
    outputValue.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
}

submitButton.addEventListener('click', function() {
    const gradesArray = getGrades();
    const gradeList = lookupGrade(gradesArray);
    const gpa = calculateGpa(gradeList);
    outputGpa(gpa);
});