let randomNumber = Math.floor(Math.random() * 99) + 1;

function guessNumber() {
    let userGuess = document.getElementById('guess').value;

    userGuess =  parseInt(userGuess);
    if (!isNaN(userGuess)) {
        if (userGuess === randomNumber) {
            document.getElementById('result').innerHTML = "Congratulations! It was " + randomNumber + "!";
	    randomNumber = Math.floor(Math.random() * 99) + 1;
        }
        else if (userGuess < randomNumber) {
            document.getElementById('result').innerHTML = "Higher than " + userGuess + "!";
        }
        else if (userGuess > randomNumber) {
            document.getElementById('result').innerHTML = "Lower than " + userGuess + "!";
        }
    }
}