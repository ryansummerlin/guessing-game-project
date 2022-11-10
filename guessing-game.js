const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const randomInRange = function(min, max) {
    min = Number(Math.ceil(min));
    max = Number(Math.floor(max));
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const askGuess = function(secretNumber, guesses) {
    if (guesses === 0) {
        console.log("You Lose");
        console.log("The number was " + secretNumber);
        rl.close();
        return;
    }

    rl.question("Enter a guess: ", answer => {
        let correct = checkGuess(answer, secretNumber);

        if (correct) {
            console.log("You win!");
            rl.close();
        }
        else if (!correct) {
            askGuess(secretNumber, guesses - 1);
        }
    });
};

const checkGuess = function(num, secretNumber) {
    if (num > secretNumber) {
        console.log("Too high");
        return false;
    }
    else if (num < secretNumber) {
        console.log("Too low");
        return false;
    }
    else if (Number(num) === secretNumber) {
        console.log("Correct!");
        return true;
    }
};

const askRange = function(guesses) {
    rl.question("Enter a max number: ", max => {
        rl.question("Enter a min number: ", min => {
            console.log("I'm thinking of a number between " + min + " and " + max + "...");
            let secretNumber = randomInRange(min, max);
            askGuess(secretNumber, guesses);
        });
    });
};

const askLimit = function() {
    rl.question("How many guesses would you like? ", guesses => {
        console.log("You will have " + guesses + " guesses");
        askRange(guesses);
    });
};

askLimit();
