// main.js
import { getUserInput } from './userInput.js';
import { addTask, markTaskAsComplete, showTasks } from './dataHandling.js';

// Example Usage
async function runApp() {
    const task = await getUserInput("Enter a new task: ");
    addTask(task);

    // Display tasks after adding
    showTasks();

    // Ask user which task to mark as complete
    const taskNumber = await getUserInput("Enter the task number to mark as complete: ");
    markTaskAsComplete(taskNumber - 1);  // Convert to 0-based index

    // Show tasks after marking one as complete
    showTasks();
}

runApp();
