//For challenge 1: your age in days

function ageInDays(){
    var birthYear = prompt("What year were you born?");
    var currentYear = new Date().getFullYear();
    var ageInDayss = (currentYear - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode("You are " + ageInDayss + " days old");
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

//For the navbar
// $('.navbar-nav > li').click(function(event) {
//     event.preventDefault();
//     var target = $(this).find('>a').prop('hash');
//     document.getElementById("home").onclick = function () {
//         location.href = "index.html";
//     };
//     document.getElementById("ageconverter").onclick = function () {
//         location.href = "ageGuess.html";
//     };
// });

//Challenge 2: Rock Paper Scissors

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRPS());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results)
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRPS(){
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}
function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {
            'scissors': 1,
            'rock': 0.5,
            'paper': 0
        },
        'paper': {
            'scissors': 0,
            'rock': 1,
            'paper': 0.5
        },
        'scissors': {
            'scissors': 0.5,
            'rock': 0,
            'paper': 1
        }
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return{
            'message': 'You lost!',
            'color': 'red'
        }
    }
    else if(yourScore === 0.5){
        return{
            'message': 'You tied!',
            'color': 'yellow'
        }
    }
    else{
        return{
            'message': 'You won!',
            'color': 'green'
        }
    }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30ox; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//Challenge 3: Blackjack

let BlackjackGame = {
    'you' : {
        'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0
    },
    'dealer' : {
        'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0
    },
    'card':[
        '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'J', 'Q', 'K', 'A'
    ],
    'cardMap':{
        '2': 2, '3': 3,  '4': 4,
        '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
}

const YOU = BlackjackGame['you'];
const DEALER = BlackjackGame['dealer'];

const hitSound = new Audio('../sounds/swish.m4a');
const winSound = new Audio('../sounds/cash.mp3');
const lostSound = new Audio('../sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener("click", blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit(){
    if(BlackjackGame['isStand'] === false){
        hitSound.play();
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}
function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `../images/Cards/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

function blackjackDeal(){
    if(BlackjackGame['turnsOver'] === true){
        BlackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play!"
        document.querySelector('#blackjack-result').style.color = 'black';

        BlackjackGame['turnsOver'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return BlackjackGame['card'][randomIndex];
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] <= 10){
            activePlayer['score'] += BlackjackGame['cardMap'][card][1];
        }   
        else{
            activePlayer['score'] += BlackjackGame['cardMap'][card][0];
        }
    }
    else if(card != 'A'){
        activePlayer['score'] += BlackjackGame['cardMap'][card]; 
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    BlackjackGame['isStand'] = true;
    
    while(DEALER['score'] < 16 && BlackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    BlackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            BlackjackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            BlackjackGame['losses']++;
            console.log("You lost! less than 21");
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            BlackjackGame['draws']++;
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        BlackjackGame['losses']++;
        console.log("lost more than 21")
        winner = DEALER;
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        BlackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(BlackjackGame['turnsOver'] === true){
        
        if(winner === YOU){
            document.querySelector('#wins').textContent = BlackjackGame['wins'];
            winSound.play();
            message = 'You won!';
            messageColor = 'green';
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = BlackjackGame['losses'];
            lostSound.play();
            message = 'You lost!';
            messageColor = 'red';
        }
        else{
            document.querySelector('#draws').textContent = BlackjackGame['draws'];
            message = 'Your tied!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}