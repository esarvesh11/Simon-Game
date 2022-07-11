var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//Level will be 0, before starting of the game
var level = 0;

// to keep track of whether if the game has started or not, so we can only call nextSequence() on the first keypress.
var started = false;

//Start game when at the beginning any key gets pressed
$(document).on("keydown", function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//When user will choose a colour
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//Function to generate next random colour
function nextSequence() {
    
    userClickedPattern = [];

    level++;
    if(level >=5 && level <= 9){
        $("#level-title").text("Level " + level + "😍");
    }
    else if(level>= 10){
        $("#level-title").text("Level " + level + "😎");
    }
    else{
        $("#level-title").text("Level " + level);
    }

    var randomNumber = Math.floor(Math.random() * 4); //randomNumber btw 0-3
    var randomChosenColour = buttonColours[randomNumber]; //Choosing randomColour
    gamePattern.push(randomChosenColour); //Adding chosenColour into an array
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

//Function to generate sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Function when user choose any colour
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//This function will check the user selected colour is correct or not
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout( function() {
                nextSequence();
            }, 1000);    
        }
    }
    else{
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over👻, Press Any Key to Restart");

        setTimeout(function () {
            startOver();
        }, 1000);
    }
}

//Function to restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}














