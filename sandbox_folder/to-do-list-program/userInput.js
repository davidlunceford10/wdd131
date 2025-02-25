// userInput.js
import readline from 'readline'; // Import readline for user input

export function getUserInput(promptMessage) {
    const input = prompt(promptMessage);
    return input;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function getUserInput(promptMessage) {
    return new Promise((resolve) => {
        rl.question(promptMessage, (input) => {
            resolve(input);
            rl.close();
        });
    });
}

