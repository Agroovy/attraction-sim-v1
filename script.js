function Body(pos, velocity, mass, r, c) {
  this.pos = pos
  this.velocity = velocity
  this.mass = mass
  this.r = r
  this.c = c

  this.forces = {
    // An objects moves in the direction of the sum of its forces
    "gravity": createVector(0, 0),
    "momentum": createVector(0,0)
  }
}
Body.prototype.move = function(){
  
}
Body.prototype.render = function () {
  fill(this.c)
  circle(this.pos.x, this.pos.y, this.r)
}

let vector
let bodies

function setup() {
  frameRate(60)
  vector = createVector //createVector is such a long name smh

  bodyA = new Body(vector(50, 600), vector(0, 0), 500, 20, "red")
  bodyB = new Body(vector(1000, 600), vector(0, 0), 50, 20, "blue")
  //bodyC = new Body(vector(1000, 700), vector(0, 0), 50, 20, "yellow")
  bodies = [bodyA, bodyB]// bodyC]

  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  //background(255)
  bodies.forEach((chosenBody, chosenIndex) => {
    bodies.forEach((loopingBody, loopingIndex) => {
      if (loopingIndex != chosenIndex) {
        loopingBody.velocity.add(attraction(loopingBody, chosenBody))
      }
    })
  })

  if (mouseIsPressed)
  {
    bodyA.pos = vector(mouseX, mouseY)
    bodyA.velocity = vector(0, 0)
  }

  // bodies.forEach(body => {
  //   pos = body.pos
  //   //if (pos.x )
  //   // Make them bounce off the walls?
  // })
  
  bodies.forEach(body => {
    body.pos.add(body.velocity)
    body.render()
  })
}

function attraction(body1, body2) {
  // Calculate the attraction between two bodies
  angleMode(DEGREES)
  pos1 = body1.pos
  pos2 = body2.pos
  
  var distance = dist(pos1.x, pos1.y, pos2.x, pos2.y)
  var mag = 0.05 * (body1.mass * body2.mass) / distance
  var heading = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x)

  var newVector = vector(1, 1)  
  newVector.setHeading(heading)
  newVector.setMag(mag)
  return(newVector)
}

function u(){
  frameRate(0)
}