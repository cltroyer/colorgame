//----------------------------game varaibles-------------------------------
var mode = 6
var color = gencolors(mode);
var squares = document.querySelectorAll(".square");
var picked = randocolor();
var colordisp = document.getElementById("rgb");
var h1 = document.querySelector('h1')
var result = document.querySelector("#result")
var reset = document.getElementById('reset')
var hmode = document.getElementById('hmode')
var emode = document.getElementById('emode')
var scolor = document.querySelector('.seleted')
var menu = document.querySelector('#menu')
var hover = document.getElementById("hover")
var win = 0

//--------------------------main game button logic-------------------------
//switch to hard mode
hmode.addEventListener("click",function(){
	hmode.classList.add("seleted")
	emode.classList.remove("seleted")
  rset()
 mode = 6
 rset()
})

hoverLog(hmode)
hoverLog(emode)
hoverLog(reset)

//switch to easy mode
emode.addEventListener("click",function(){
	emode.classList.add("seleted")
	hmode.classList.remove("seleted")
  rset()
 mode = 3
 rset()
 // This is to black out the bottom row
 for (var i = 3; i < squares.length; i++) {
 	squares[i].style.background = "#232323"
 };
})

//this is to change the displayed rgb value
colordisp.textContent = picked;
//monitors the reset
reset.addEventListener("click", function() {
	rset()
})

//sets up the game
colorSquares()


//---------------------------------functions---------------------------------
//this changes all the squairs to the correct color after it is selected
function colorChange (color) {
	for (var i = 0; i < mode ; i++) {
		squares[i].style.background = color;
	}
}

//this selects the correct answer
function randocolor () {
	var ran = Math.floor(Math.random() * color.length)
	return color[ran]
}

//this assembles the color array 
function gencolors (num) {
	var arr = []
	for (var i = 0; i < num; i++) {
		arr.push(colorMake())
	};
	return arr;
}

// this creates 1 random rgb color
function colorMake () {
	var r = Math.floor(Math.random() * 256)
	var g = Math.floor(Math.random() * 256)
	var b = Math.floor(Math.random() * 256)
return "rgb("+r+", "+g+", "+b+ ")"
}

// Reset logic
function rset(){
	if (mode === 3) {
		emode.style.background = ""
	} else{
		hmode.style.background = ""
		}
	win = 0
	color = gencolors(mode);
	picked = randocolor();
	colordisp.textContent = picked;
	h1.style.background = "#365D70"
	colorSquares()
	result.textContent = ""
	reset.textContent = "New Colors"
	result.style.padding = "0 42px 0"
	for (var i = 0; i < squares.length; i++) {
		squares[i].classList.remove("fade")
	}

}

// This is the logic to run the game
function colorSquares(){
	for (var i = 0; i < squares.length; i++) {
	squares[i].style.background = color[i]
	squares[i].addEventListener("click", function(){
		var clicked = this.style.background
		if (clicked != picked) {
			this.classList.add("fade")
			result.textContent = "Try Again";
			result.style.padding = "0 2px 0";
		} else{
			result.textContent = "Correct"
			win = 1
			if (mode === 3) {
				emode.style.background = picked

			} else{
				hmode.style.background = picked
			}
				for (var i = 0; i < squares.length; i++) {
				squares[i].classList.remove("fade")
					}
			colorChange(clicked)
			h1.style.background = clicked
			reset.textContent = "Play Again?"	
		}
	})
};
}

// This controls hover
function hoverLog(buttion){
	buttion.addEventListener("mouseover",function(){
	buttion.classList.add("hover")
		if(win === 1){
		buttion.style.background = picked

	}
})
buttion.addEventListener("mouseout",function(){
	buttion.classList.remove("hover")
	buttion.style.background = ""
})
}