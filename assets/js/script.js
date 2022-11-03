const choiceButtons = document.querySelectorAll('[data-choice]');
const finalColumn = document.querySelector('[data-column]')
const CHOICES = [
    {
        name: 'rock',
        image: './assets/images/rock',
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

choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', event => {
        const choiceName = choiceButton.dataset.choice
        const choice = CHOICES.find(choice => choice.name === choiceName)
        makeChoice(choice);
    })
})



function makeChoice(choice) {
    const computerChoice = randomChoice();
    const youWin = isWinner(choice, computerChoice);
    const computerWin = isWinner(computerChoice, choice);
    addChoiceResult(computerChoice, computerWin);
    addChoiceResult(choice, youWin);
}

function addChoiceResult(choice, winner) {
    const div = document.createElement('div');
    div.innerText = choice.image;
    div.classList.add('result-choice');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);
    
}

function randomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function isWinner(choice, computerChoice) {
    return choice.beats === computerChoice.name
}