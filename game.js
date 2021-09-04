console.log($("h1"));

var randomNumber = 0;
var randomChosenColor = "empty";
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = new Array();
var userClickedPattern  = new Array();
var userChosenColour = "wrong";
var level = 0;

function resetEverything(){
  randomNumber = 0;
  randomChosenColor = "empty";
  gamePattern = new Array();
  userClickedPattern  = new Array();
  userChosenColour = "wrong";
  level = 0;
}

function playSound(name){
  var audio = new Audio("sounds"+"/"+name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },80);
}

function nextSequenceCalculationPart(){
  randomNumber =  Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).animate({opacity:0.5}).animate({opacity:1});
}

function nextSequence(){
  level = level +1;
  $("h1").text("Level " + level);
  setTimeout(nextSequenceCalculationPart,500);
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },300);
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(resetEverything,300);
}


function checkAnswer()
{
  var len1 = gamePattern.length;
  var len2 = userClickedPattern.length;
  if(len1 >= len2 && gamePattern[len2-1] === userClickedPattern[len2-1])
  {
    if(len1 === len2)
    {
      userClickedPattern  = new Array();
      setTimeout(nextSequence,500);
    }
  }
  else
  {
    setTimeout(gameOver,400);
  }

}

$(".btn").click(function(event){
  if(level > 0)
  {
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
  }
});

$(document).keypress(function(event){
  if(level == 0)
  {
    setTimeout(nextSequence,500);
  }
})
