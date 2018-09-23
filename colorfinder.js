var numSquares = 9;


var squares = document.querySelectorAll(".square");

var gameMode = document.querySelector("#gameMode");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#reset");
var modes = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");


var flicker = false; 
var pickedColor = getRandomColor();
gameMode.textContent = pickedColor;
setupMode();
if(flicker === true){
	flickerColor();
}


var colors = generateColorArray();

updateSquares();
setupSquares();



function setupMode(){
	for(let i = 0; i < modes.length; i++){

		modes[i].addEventListener("click", function(){
			if(modes[i].textContent === "RGB Finder"){
				flicker = false;
			}
			else{
				flicker = true;
			}
			reset();
		});

	}
}

function setupSquares(){
	for(let i = 0; i < numSquares; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if( clickedColor === pickedColor){
				toWinningColor();
				messageDisplay.textContent = "You Win!";
				h1.style.backgroundColor = pickedColor;
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again...";
			}
		})
	}

}
function reset(){
	pickedColor = getRandomColor();
	gameMode.textContent = pickedColor;
	messageDisplay.textContent = "";
	colors = generateColorArray();

	if(flicker === true){
		flickerColor();
	}
	else{
		h1.style.backgroundColor = "steelblue";
	}
	updateSquares();
	setupSquares();
	
}

resetBtn.addEventListener("click", function(){
	reset();
});
function toWinningColor(){
	for(let i = 0; i< numSquares; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
}

function updateSquares(){
	for(let i = 0 ; i< numSquares; i++){
			squares[i].style.backgroundColor = colors[i];
	}	
}

function getRandomColor(){
	// Returns a random RBG String
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function flickerColor(){
	// Displays the picked color in middle square, and hides all other squares
	gameMode.textContent = "flickered color";
	h1.style.backgroundColor = pickedColor;
	setTimeout(function(){h1.style.backgroundColor = "steelblue"}, 250);
}

function getRandomIndex(){
	// Returns random index 
	return Math.floor(Math.random() * numSquares);
}

function generateColorArray(){
	// Generates color array with Picked Color randomlly placed
	var randomIndex = getRandomIndex();
	var arr = [];
	for(let i = 0; i < numSquares; i++){
		if( i == randomIndex){
			arr.push(pickedColor);
		}
		else{
			arr.push(getRandomColor());
		}
	}
	return arr;
}