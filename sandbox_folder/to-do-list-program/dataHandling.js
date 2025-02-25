// dataHandling.js
export const tasks = [];

export function addTask(taskName) {
    tasks.push({ name: taskName, completed: false });
    console.log(`Task added: ${taskName}`);
}

export function markTaskAsComplete(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log(`Task ${index + 1} marked as complete!`);
    } else {
        console.log("Invalid task index.");
    }
}

export function showTasks() {
    console.log("Your tasks:");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.name} - ${task.completed ? 'Completed' : 'Not completed'}`);
    });
}
