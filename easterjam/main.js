var texture, point_texture;
var egg;
var egg_frame = 0;
var egg_sprite = [];
var renderer = PIXI.autoDetectRenderer(800, 500);
var egg_speed = 20;
var direction = 0;
var jump = false;

var pointer;
var pointer_frame = 0;
var pointer_sprite = [];

var feed_button;
var play_button;
var ok_button;

var lasttime;
var frametime;

var hungry_text;
var hungry_meter = 20;
var happy_text;
var happy_meter = 100;

var UI_bar;

// Set the background color of the renderer to a baby-blue'ish color
renderer.backgroundColor = 0xeacbd2;

// Append the renderer to the body of the page
document.body.appendChild(renderer.view);



// Create the main stage for your display objects
var stage = new PIXI.Container();
var boxWidth = renderer.width / 10;
var boxHeight = renderer.height / 10;
PIXI.loader
    .add("egg.png")
    .add("pointer.png")
    .add("button_feed.png")
    .add("button_play.png")
    .add("button_ok.png")
    .load(setup);


function animateEgg() {
    if(direction == 0) return;
    egg_frame = (egg_frame + 1) % 2;
    texture.frame = egg_sprite[egg_frame];
}

function animate() {
    var currtime = new Date().getTime();
    var delta = (currtime-lasttime)/1000;
    
    //0 = idle, 1 = left, 2 = right
    if(jump){
        egg.position.y -= egg_speed * 2 * delta;
    } else {
        if(egg.position.y <= 250 && egg.position.y > 0){
            egg.position.y += egg_speed * 2 * delta;
        }
    }
    var x = egg.position.x + (egg_speed * delta);
    if(x > 400 && x < 700) {
        if(direction == -1) {
            egg.position.x -= egg_speed * delta;
        } else if(direction == 1){
            egg.position.x += egg_speed * delta;
        }
    }
    else{
        if(x <= 400)  egg.position.x = 401;
        else if(x >= 700)  egg.position.x = 699;
    }
        
    // Render our container
    
    // Draw the stage and prepare for the next frame
    renderer.render(stage);
    requestAnimationFrame(animate);
    lasttime = currtime;
}
function setup() {
    setup_screen();
    setup_UI();
    //Create the `tileset` sprite from the texture
    texture = PIXI.utils.TextureCache["egg.png"];
    point_texture = PIXI.utils.TextureCache["pointer.png"];
    var feed_texture = PIXI.utils.TextureCache["button_feed.png"];
    var play_texture = PIXI.utils.TextureCache["button_play.png"];
    var ok_texture = PIXI.utils.TextureCache["button_ok.png"];
    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    var egg_left = new PIXI.Rectangle(0, 0, 81, 106);
    var egg_right = new PIXI.Rectangle(81, 0, 81, 106);
    var pointer_off = new PIXI.Rectangle(0, 0, 100, 100);
    var pointer_on = new PIXI.Rectangle(100, 0, 100, 100);
    var feed_frame = new PIXI.Rectangle(0, 0, 150, 50);
    var play_frame = new PIXI.Rectangle(0, 0, 150, 50);
    var ok_frame = new PIXI.Rectangle(0, 0, 150, 50);
    
    egg_sprite = [egg_left, egg_right];
    pointer_sprite = [pointer_off, pointer_on];
    //Tell the texture to use that rectangular section
    texture.frame = egg_left;
    point_texture.frame = pointer_off;
    
    ok_texture.frame = ok_frame;
    ok_button = new PIXI.Sprite(ok_texture);
    ok_button.interactive = true;
    
    
    feed_texture.frame = feed_frame;
    feed_button = new PIXI.Sprite(feed_texture);
    feed_button.interactive = true;
    feed_button.buttonMode = true;
    
    
    play_texture.frame = play_frame;
    play_button = new PIXI.Sprite(play_texture);
    play_button.interactive = true;
    
   
    //Create the sprite from the texture
    egg = new PIXI.Sprite(texture);
    pointer = new PIXI.Sprite(point_texture);
    //Position the rocket sprite on the canvas
    egg.y = 250;
    egg.x = 300 + 250;
    
    feed_button.position.x = 20;
    feed_button.position.y = 110;
    
    play_button.position.x = 20;
    play_button.position.y = 250;
    
    ok_button.position.x = 20;
    ok_button.position.y = 390;
    
    
    ok_button.click = eggOk;
    feed_button.click = eggFeed;
    play_button.click = eggPlay;
    
    egg.anchor.x = egg.anchor.y = 0.5;

    egg.interactive = true;
    egg.on('mousedown', eggAction);

    pointer.x = pointer.y = 32;

    pointer.anchor.x = 0.5;
    pointer.anchor.y = 0.5;

    //Add the rocket to the stage
    
    stage.addChild(feed_button);
    stage.addChild(play_button);
    stage.addChild(ok_button);
    stage.addChild(egg);
    stage.addChild(pointer);
    // Add the 'keydown' event listener to our document
    document.addEventListener('mouseup', animatePointer);
    document.addEventListener('mousedown', animatePointer);
    document.addEventListener('mousemove', movePointer);
    
    setInterval( function () {
        direction = Math.round((Math.random() * 3)) - 1;
    }, Math.round((Math.random() * 5000)) + 1000);
    setInterval(animateEgg, 300);
    setInterval(checkStats, 1500);
    
    //Render the stage   
    renderer.render(egg);
    renderer.render(pointer);
    // Start animating
    lasttime = new Date().getTime();
    requestAnimationFrame(animate);
}

function animatePointer(){
    pointer_frame = (pointer_frame + 1) % 2;
    point_texture.frame = pointer_sprite[pointer_frame];
}

function eggAction(){
    console.log("JUMP");
    jump = true;
    setTimeout(function(){
        jump = false;
    }, 2000);
}

function movePointer(){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;
    pointer.position.x = x;
    pointer.position.y = y;
}

function setup_UI() {
    UI_bar = new PIXI.Graphics();
    var title_bar = new PIXI.Graphics();
    UI_bar.beginFill(0x82667f);
    UI_bar.drawRect(0, 0, 300, 500);
    UI_bar.endFill();
    title_bar.beginFill(0xdd9ac2);
    title_bar.drawRect(0, 0, 800, 50);
    title_bar.endFill();
    var title = new PIXI.Text("LEGGY PET SIMULATOR 2K16", {font:"36px Arial", fill:0xb486ab});
    hungry_text = new PIXI.Text("Hungy: NO", {font:"30px Arial", fill:"white"});
    happy_text = new PIXI.Text("Hapy: YES", {font:"30px Arial", fill:"white"});
    var suffer_text = new PIXI.Text("Suffer: ALWAYS", {font:"30px Arial", fill:"white"});
    title.x = 10;
    title.y = 5;
    hungry_text.x = 10;
    hungry_text.y = 60;
    happy_text.x = 10;
    happy_text.y = 200;
    suffer_text.x = 10;
    suffer_text.y = 340;
    UI_bar.addChild(hungry_text);
    UI_bar.addChild(happy_text);
    UI_bar.addChild(suffer_text);
    
    
    
    
    title_bar.addChild(title);
    stage.addChild(UI_bar);
    stage.addChild(title_bar);
    animateTitle(title);
}

function setup_screen(){
    var floor = new PIXI.Graphics();
    floor.beginFill(0xdfaeb4);
    floor.drawRect(300, 250, 500, 250);
    floor.endFill();
    
    stage.addChild(floor);
}

function animateTitle(title) {
    if(title.x < (0 - title.getBounds().width)){
        title.x = 800;
    }
    title.x--;
    requestAnimationFrame(function(){
        animateTitle(title);
    });
}

function checkStats(){
    if(hungry_meter > 70) {
        hungry_text.text = "Hungy: YES";
    } 
    else if(hungry_meter < 0) {
        hungry_text.text = "Hungy: STOP.";
    }
    else {
        hungry_text.text = "Hungy: NO";
    }
    if(happy_meter < 30){
        happy_text.text = "Hapy: NO";
    } 
    else if (happy_meter > 30 && happy_meter < 70) {
        happy_text.text = "Hapy: MAYBE";
    }    
    else {
        happy_text.text = "Hapy: YES";
    }
    if(hungry_meter != 200) hungry_meter++;
    if(happy_meter != 0) happy_meter--;
}

function eggFeed(){
    console.log("Click");
    if((hungry_meter-20) > -50) hungry_meter -= 5;
    else hungry_meter = -50;
    checkStats();
}

function eggPlay(){
    console.log("Click");
    if(happy_meter+20 < 100) happy_meter += 5;
    else happy_meter = 100;
    checkStats();
}

function eggOk(){
    console.log("Click");
    checkStats();
}