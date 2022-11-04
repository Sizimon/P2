const choiceButtons = document.querySelectorAll('[data-choice]');
const finalColumn = document.querySelector('[data-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]')
/** Global constant objects and values*/
const CHOICES = [
    {
        name: 'rock',
        image: './assets/images/rock.png',
        beats: 'scissors'
    },
    {
        name: 'paper',
        image: './assets/images/paper.png',
        beats: 'rock',
    },
    {
        name: 'scissors',
        image: './assets/images/scissors.png',
        beats: 'paper',
    }
]
/**
 * adds click event to all the buttons and differentiates them based of their .name value
 */
choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', event => {
        const choiceName = choiceButton.dataset.choice
        const choice = CHOICES.find(choice => choice.name === choiceName)
        makeChoice(choice);
    })
})

/**
 * Creates the make choice function which is called on click in the code above
 * the function makes the computer make a random choice
 * determines the winner and calls the addChoiceResult function to display the match
 * @param {*} choice 
 */

function makeChoice(choice) {
    const computerChoice = randomChoice();
    const youWin = isWinner(choice, computerChoice);
    const computerWin = isWinner(computerChoice, choice);

    addChoiceResult(computerChoice, computerWin);
    addChoiceResult(choice, youWin);
    if (youWin) incrementScore(yourScoreSpan);
    if (computerWin) incrementScore(computerScoreSpan);

    if (yourScoreSpan.innerHTML == '3') {
        openPopupWinner();
    } else if (computerScoreSpan.innerHTML == '3') {
        openPopupLoser();
    }
}
/* Creates Div and Appends image corresponding to choice, adds it under the scoreboard */
function addChoiceResult(choice, winner) {
    const imgID = choice.image;
    const img = document.createElement('img');
    img.src = imgID;
    const div = document.createElement('div');
    div.appendChild(img);
    div.classList.add('result-choice');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);    
}
/* Function for the computer to make a random choice */
function randomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

/* Function to determine the winner based of the choice object values */

function isWinner(choice, computerChoice) {
    return choice.beats === computerChoice.name
}

/* Function that increments the score by one  */

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

/* Pop up window function */

const popupWin = document.getElementById('popup-winner');
const popupLose = document.getElementById('popup-loser');

function openPopupWinner() {
    popupWin.classList.add('open-popup')
}

function openPopupLoser() {
    popupLose.classList.add('open-popup')
}

/* Reset button for the game (brings everything back to default) */

function resetGame() {
    popupWin.classList.remove('open-popup')
    popupLose.classList.remove('open-popup')
    yourScoreSpan.innerText = '0'
    computerScoreSpan.innerText = '0'
    const resets = document.querySelectorAll('.result-choice', 'winner');
    resets.forEach(reset => {
        reset.remove();
    });
}
