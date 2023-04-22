const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const browser_width = window.innerWidth;
const browser_height = window.innerHeight;
const scale_multiplier = 4;
const gravity = 0.3;
canvas.width = browser_width;
canvas.height = browser_height;

class Sprite {
  constructor({ position, image_src }) {
    this.position = position;
    this.image = new Image();
    this.image.src = image_src;
  }

  draw() {
    if (!this.image) return;
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    ctx.save();
    ctx.scale(scale_multiplier, scale_multiplier);
    ctx.translate(0, -this.image.height + canvas.height / scale_multiplier);
    this.draw();
    ctx.restore();
  }
}

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

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  down_gravity() {
    if (this.position.y + this.dimensions.y + this.velocity.y < browser_height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
    this.position.y += this.velocity.y;
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

  move() {
    this.velocity.x = 0;
    if (this.keys.up && this.velocity.y == 0) {
      this.velocity.y = -15;
    }
    if (this.keys.down) {
      this.velocity.y = 10;
    }
    if (this.keys.left) {
      this.velocity.x = -5;
    }
    if (this.keys.right) {
      this.velocity.x = 5;
    }
  }

  update() {
    console.log(this.velocity.y);
    this.draw();
    this.position.x += this.velocity.x;
    this.down_gravity();
    this.move();
  }
}

const player = new Player(
  new Coordinates(100, 100),
  new Coordinates(0, 0),
  new Coordinates(0, 0)
);

const background = new Sprite({
  position: new Coordinates(0, 0),
  image_src: "assets/background.png",
});
// Make the Canvas White
ctx.fillStyle = "white";
ctx.fillRect(0, 0, browser_width, browser_height);

// Make Rectangle representing the player
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 50, 50);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, browser_width, browser_height);
  background.update();
  player.update();
  //   player2.update();
}

animate();

// Add Event Listener for keydown
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (!player.keys.up) player.keys.up = true;
      break;
    case "ArrowDown":
    case "s":
      player.keys.down = true;
      break;
    case "ArrowLeft":
    case "a":
      player.keys.left = true;
      break;
    case "ArrowRight":
    case "d":
      player.keys.right = true;
      break;
  }
});

// Add Event Listener for keydown
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      player.keys.up = false;
      break;
    case "ArrowDown":
    case "s":
      player.keys.down = false;
      break;
    case "ArrowLeft":
    case "a":
      player.keys.left = false;
      break;
    case "ArrowRight":
    case "d":
      player.keys.right = false;
      break;
  }
});
