const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const browser_width = window.innerWidth;
const browser_height = window.innerHeight;

const gravity = 0.3;
canvas.width = browser_width;
canvas.height = browser_height;

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor(dimensions, position, velocity) {
    this.dimensions = dimensions;
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.x,
      this.dimensions.y
    );
  }

  update() {
    this.draw();
    if (this.position.y + this.dimensions.y + this.velocity.y < browser_height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
    this.position.y += this.velocity.y;
  }
}

const player = new Player(
  new Coordinates(100, 100),
  new Coordinates(0, 0),
  new Coordinates(0, 0)
);
// Make the Canvas White
ctx.fillStyle = "white";
ctx.fillRect(0, 0, browser_width, browser_height);

// Gravity

// Make Rectangle representing the player
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 50, 50);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, browser_width, browser_height);
  player.update();
  //   player2.update();
}

animate();
