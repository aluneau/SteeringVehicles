function Vehicle(x,y){
	this.r = 5;
	this.acceleration = createVector(0, 0);
	this.position = createVector(x, y);
	this.velocity = createVector(0,0);

	this.maxspeed = 5;
	this.maxforce = 0.2;

	this.update = function(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxspeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);

	}

	this.applyForce = function(force){
		this.acceleration.add(force);
	}

	this.seek = function(target) {
		var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target

		// Scale to maximum speed
		desired.normalize().mult(this.maxspeed);

		// Steering = Desired minus velocity
		var steer = p5.Vector.sub(desired,this.velocity);
		steer.limit(this.maxforce);  // Limit to maximum steering force
 
		this.applyForce(steer);
    }

    this.eat = function(toEat){
    	var targetIndex = null;
    	var minDist = Infinity;
    	for(var i = toEat.length-1; i>=0; i--){
    		var dist = toEat[i].dist(this.position);
    		if(dist < this.maxspeed){
    			toEat.splice(i,1);
    		}else{
	    		if(dist < minDist){
	    			minDist=dist;
	    			targetIndex = i;
	    		}
    		}
    	}
    	if(targetIndex != null){
    		if(toEat[targetIndex]!=undefined){
    			this.seek(toEat[targetIndex])
    		}
    	}
    }

	this.draw = function(){
		//var theta = this.velocity.heading() + Math.PI/2;
		var theta = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI/2;
		fill(204, 101, 192, 127);
  		stroke(127, 63, 120);
  		push();
  		translate(this.position.x, this.position.y);
		rotate(theta);
		fill(255);
	    stroke(255);
	    strokeWeight(1);
	    beginShape();
	    vertex(0, -this.r * 2);
	    vertex(-this.r, this.r * 2);
	    vertex(this.r, this.r * 2);
	    endShape(CLOSE);
	    pop();

	}
}