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