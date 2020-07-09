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