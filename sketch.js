var vehicles = [];
var food = [];

setInterval(function(){
	food.push(createVector(Math.random()*width, Math.random()*height));
}, 500);

function setup() {
	createCanvas(720, 400);
	background(200);

	for(var i=0; i < 5; i++){
		vehicles.push(new Vehicle(Math.random()*width,Math.random()*height));
	}
	for (var i=0; i<2000; i++){
		food.push(createVector(Math.random()*width, Math.random()*height));
	}
}

function draw() {
	background(51);
	mousePos = createVector(mouseX, mouseY);

	for(var i = 0; i < food.length; i++){
		ellipse(food[i].x, food[i].y, 5);
	}

	for(var i=0; i<vehicles.length; i++){
		vehicles[i].eat(food);
		vehicles[i].update();
		vehicles[i].draw();
	}
}