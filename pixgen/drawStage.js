/*
	Get HTML5 canvas elements
 */
var c = document.getElementById('circleSpace'),
	o = document.getElementById('overlay');
var cctx = c.getContext('2d'),
	octx = o.getContext('2d');

/*
	ClientCircle Class.
	TODO: [Consider moving thing to another file]
 */
var ClientCircle = (function(){
	/**
	 * Constructor
	 * @param {String} uuid [unique user ID]
	 * @param {int} x    [center x-coordinate]
	 * @param {int} y    [center y-coordinate]
	 * @param {int} r    [circle radius]
	 */
	function ClientCircle(uuid, x, y, r){
		this.uuid = uuid;
		this.x = x || 0;
		this.y = y || 0;
		this.r = r || 50;
		this.fillStyle = randomColor();
		this.redraw(this.x, this.y);
		return(this);
	}

	/*
		Public methods
	 */
	/**
	 * Redraws the circle on the canvas
	 * @param  {int} x [new center x-coord]
	 * @param  {int} y [new center y-coord]
	 * @return {void}
	 */
	ClientCircle.prototype.redraw = function(x, y) {
		this.x = x;
		this.y = y;
		cctx.save();
		cctx.beginPath();
		cctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		cctx.fillStyle = this.fillStyle;
		cctx.fill();
		cctx.restore();
		return (this);
	};

	/*
		Private methods
	 */

	return ClientCircle;

})();

function CanvasState(canvas){
	this.valid = false;		//Redraws entire canvas if set true
	this.circles = [];		//List of circles to be drawn 

	var myState = this;

	canvas.addEventListener('select', function(e){
		e.preventDefault();
		return false;
	}, false);

	canvas.addEventListener('mousedown', function(e){
		var mouse = myState.getMouse(e),
			mx = mouse.x;
			my = mouse.y;
			shapes = myState.shapes;
			for(var i = shapes.length-1; i >= 0; i--){
				if(shapes[i].contains(mx, my)){
					var selection = shapes[i];
					myState.selection = selection;
					myState.valid = false;
					return;
				}
			}

			if(myState.selection){
				myState.selection = null;
				myState.valid = false;
			}
	}, true);

	canvas.addEventListener('mouseup', function(e){
		//unflick
	});

	this.selectionColor = 'red';
	this.selectionWidth = 2;
	this.interval = 30;				//30 fps
	setInterval(function(){
		myState.draw();
	}, myState.interval);

	canvas.prototype.draw = function(){
		if (!this.valid) {
	    var ctx = this.ctx;
	    var shapes = this.shapes;
	    this.clear();
	    
	    // ** Add stuff you want drawn in the background all the time here **
	    
	    // draw all shapes
	    var l = shapes.length;
	    for (var i = 0; i < l; i++) {
	      var shape = shapes[i];
	      // We can skip the drawing of elements that have moved off the screen:
	      if (shape.x > this.width || shape.y > this.height ||
	          shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
	      shapes[i].draw(ctx);
	    }
	    
	    // draw selection
	    // right now this is just a stroke along the edge of the selected Shape
	    if (this.selection != null) {
	      ctx.strokeStyle = this.selectionColor;
	      ctx.lineWidth = this.selectionWidth;
	      var mySel = this.selection;
	      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
	    }
	    
	    // ** Add stuff you want drawn on top all the time here **
	    
	    this.valid = true;
		}
	}

	CanvasState.prototype.getMouse = function(e) {
	    var element = this.canvas,
	        offsetX = 0,
	        offsetY = 0,
	        mx, my;

	    // Compute the total offset
	    if (element.offsetParent !== undefined) {
	        do {
	            offsetX += element.offsetLeft;
	            offsetY += element.offsetTop;
	        } while ((element = element.offsetParent));
	    }

	    // Add padding and border style widths to offset
	    // Also add the offsets in case there's a position:fixed bar
	    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
	    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

	    mx = e.pageX - offsetX;
	    my = e.pageY - offsetY;

	    // We return a simple javascript object (a hash) with x and y defined
	    return {
	        x: mx,
	        y: my
	    };
	}
}

/**
 * Generates a random hex color value
 * @return {[String]} [Hex Color]
 */
function randomColor(){
	var rgb = [0, 0, 0];
	//Generates color in RGB format first
	rgb[0] = Math.round(Math.random()*256);
	rgb[1] = Math.round(Math.random()*256);
	rgb[2] = Math.round(Math.random()*256);
	//Convert to hex
	return "#" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16); 
}