var colorRange = 10;
var pixelSize = 5;
var colors = [];
var canvas;
var ctx;

$(document).ready(function() {
	canvas = document.getElementById("navcanvas");
	ctx = canvas.getContext("2d");
	generateCanvas();
});

var colorBlock = {
	hex: "",
	point: {
		x: 0,
		y: 0
	},
	draw: function(x, y){
		
	}
};

function forceTile(){
	var pixModW = canvas.width % pixelSize;
	var pixModH = canvas.height % pixelSize;
	//console.log(pixModW + " " + pixModH);
	if(pixModW !== 0 || pixModH !== 0){
		if(pixelSize/2 < pixModH){
			pixelSize -= pixModH;
		} else {
			pixelSize += (pixelSize - pixModH);
		}
	}
}

function generateColors(colorRange){
	//Get number of colors
	colors = [];
	for(var i = 0; i < colorRange; i++){
		var rgb = randomRGB();
		colors[i] = getRandomColor();
	}

	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
    	return color;
	}

	function randomRGB(){
		var rgb = [0, 0, 0];
		for(var i = 0; i < rgb.length; i++){
			rgb[i] = Math.floor((Math.random() * 255) + 1).toString(16);
		}
		return rgb;
	}
}

function generateCanvas(){
	//figure out canvas size
	var y, x;
	// Keep pixels tiled on the canvas
	pixelSize = Math.floor((Math.random() * (20 - 4 + 1) + 4));
	colorRange = Math.floor((Math.random() * (10 - 3 + 1) + 3));
	forceTile();
	generateColors(colorRange);
	for(y = 0; y <= canvas.height; y+=pixelSize){
		for(x = 0; x <= canvas.width; x+=pixelSize){
			ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
			ctx.fillRect(x, y, pixelSize, pixelSize);
		}
	}
}

function draw(){
	x = Math.floor((Math.random() * canvas.width) + 1);
	y = Math.floor((Math.random() * canvas.height) + 1);
	ctx.fillStyle = Math.floor(Math.random() * colors.length);
	console.log(x + " " + y);
	ctx.fillRect(x, y, 1, 1);
}