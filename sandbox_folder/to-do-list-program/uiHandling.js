// uiHandling.js
export function showMessage(message) {
    alert(message);
}

export function showTaskList(tasks) {
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}
