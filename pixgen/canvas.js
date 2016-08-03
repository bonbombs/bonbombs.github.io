var colorRange = 10;
var pixelSize = 5;
var colors = [];

$(document).ready(function() {
	loadEvents();
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	//console.log("READY!");
});

function loadEvents(){
	$('#colorRange').click(function() {
		colorRange = parseInt($('#colorRange').val());
		document.getElementById("colorRangeVal").innerHTML = colorRange;
	})

	$('#pixelRange').click(function() {
		pixelSize = parseInt($('#pixelRange').val());
		document.getElementById("pixelRangeVal").innerHTML = pixelSize;
	})

	$('#generateCanvas').click(function(event) {
		event.preventDefault();
		generateCanvas();
	});



	$('#save').click(function(e) {
		var img = canvas.toDataURL("image/png").replace();
		$(this).href = img;
	})
}

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
	console.log(pixModW + " " + pixModH);
	if(pixModW !== 0 || pixModH !== 0){
		if(pixelSize/2 < pixModH){
			pixelSize -= pixModH;
		} else {
			pixelSize += (pixelSize - pixModH);
		}
	}
	document.getElementById("pixelRangeVal").innerHTML = pixelSize;
	$('#pixelRange').val(pixelSize);
}

function printColorList(){
	$('#colorList').empty();
	for(var i = 0; i < colors.length; i++){
		$('#colorList').append("<div class='colorCircle' style='background-color:"  + colors[i] + "'></div>");
	}
	$('.colorCircle').hover(function() {
		/* Stuff to do when the mouse enters the element */
		var color = $(this).css('background-color');
		$('#showHex').text(color);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$('#showHex').empty();
	});

	$('.colorCircle').click(function(event) {
		$(this).css('border', '1px solid blue');
	});
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Keep pixels tiled on the canvas
	if($('#checkTile').is(':checked')){
		forceTile();
	}
	// Keep colors but change tile/pixel size and/or pattern
	if(!$('#retainColors').is(':checked') || colors.length === 0 ){
		generateColors(colorRange);
		printColorList();
	} 
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