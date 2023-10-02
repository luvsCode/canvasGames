const canvas = document.getElementById("cnvs");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextCircle = 0;
let circleInterval = 500;
let lastTime = 0;
//let redCircles = [];
let blueCircles = [];
let greenCircles = [];

class Circle {
  constructor(color) {
    this.width = 100;
    this.height = 50;
    this.radius = 20;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.color = color;
  }
  update(deltaTime) {
    this.x -= this.directionX;
    this.y += this.directionY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

//const redCircle = new Circle();

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  timeToNextCircle += deltaTime;
  if (timeToNextCircle > circleInterval) {
    // redCircles.push(new Circle("red"));
    blueCircles.push(new Circle("blue"));
    greenCircles.push(new Circle("green"));
    timeToNextCircle = 0;
  }

  [...blueCircles, ...greenCircles].forEach((object) =>
    object.update(deltaTime)
  ),
    [...blueCircles, ...greenCircles].forEach((object) => object.draw());
  requestAnimationFrame(animate);
}
animate(0);
