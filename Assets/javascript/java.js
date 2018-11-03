$(document).ready(function () {

  // Array containing the trivia questions

    var options = [
	{
		question: "Which NFL QB has the most Super Bowl Rings?", 
		choice: ["Eli Manning", "Tom Brady", "Dan Marino", "Ben Roethlisberger"],
		answer: 1,
		photo: "Assets/images/tom_brady.gif"
	 },
	 {
	 	question: "What is the highest-grossing film of all time?", 
		choice: ["Avatar", "Titanic", "Gone with the Wind", "Star Wars: The Force Awakens"],
		answer: 0,
		photo: "Assets/images/avatar.jpg"
	 }, 
	 {
	 	question: "The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, what does it refer to?", 
		choice: ["Heart Disease", "Rectum Infection", "Lung Disease", "Brain Disease" ],
		answer: 2,
		photo: "Assets/images/well_damn.gif"
	}, 
	{
		question: "In which Asian country is the city of Chiang Mai located?", 
		choice: ["China", "Japan", "Thailand", "Mongolia" ],
		answer: 2,
		photo: "Assets/images/chiang_mai.jpg"
	}, 
	{
		question: "Who is the only basketball player to score 100 points in a single NBA game?", 
		choice: ["Kobe Bryant", "Michael Jordan", "Larry Bird", "Wilt Chamberlain" ],
		answer: 3,
		photo: "Assets/images/wilt.gif"
	}, 
	{
		question: "What is the Patronus of Harry Potter?", 
		choice: ["Faun", "Stag", "Fish", "Owl" ],
		answer: 1,
		photo: "Assets/images/stag.gif"
	}, 
	{
		question: "What is the heaviest element?", 
		choice: ["Magnesium", "Uranium", "Givemerum", "Lolonium" ],
		answer: 1,
		photo: "Assets/images/uranium.gif"
	}, 
	{
		question: "What color are aircraft black boxes?", 
		choice: ["Orange", "Black", "Red", "Green" ],
		answer: 0,
		photo: "Assets/images/blackbox.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];


//Hide the reset button http://api.jquery.com/hide/
$("#reset").hide();

//click start button to start game fucntion
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//start timer fucntion
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown function
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}
 // reset game function 
$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})