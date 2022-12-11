var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
if(!started){
    nextSequence();
    $("#level-title").text("level "+level);
    started=true;

}
})

$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
var randomNumber=Math.floor(Math.random()*4);

var randomChosenColour=buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


}
function playSound(name){
var audio = new Audio('sounds/'+name+'.mp3');
audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
    $("#"+currentColour).removeClass("pressed"); 
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 400);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
    }

}
function startOver(){
gamePattern=[];
userClickedPattern=[];
started=false;
level=0;

}

