/** @type {HTMLCanvasElement} */

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const numberOfEnemies1 = 50;
const enemies1 = [];

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const numberOfEnemies2 = 25;
const enemies2 = [];

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const numberOfEnemies3 = 75;
const enemies3 = [];

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
const numberOfEnemies4 = 20;
const enemies4 = [];

CANVAS_WIDTH =
  canvas1.width =
  canvas2.width =
  canvas3.width =
  canvas4.width =
    500;
CANVAS_HEIGHT =
  canvas1.height =
  canvas2.height =
  canvas3.height =
  canvas4.height =
    1000;

let gameFrame = 0;
class Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    this.image = new Image();
    this.image.src = imageScr;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
}

class FlappingEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.image.src = "/assets/enemy1.png";
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx1.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class WigglyEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.speed = Math.random() * 4 + 1;
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx2.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class SlidderingEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * 100;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x =
      (CANVAS_WIDTH / 2) * Math.sin((this.angle * Math.PI) / 90) +
      CANVAS_WIDTH / 2 -
      this.width / 2;
    this.y =
      (CANVAS_HEIGHT / 2) * Math.cos((this.angle * Math.PI) / 750) +
      CANVAS_HEIGHT / 2 -
      this.height / 2;
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx3.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class SpinningEnemy extends Enemy {
  constructor(imageScr, spriteWidth, spriteHeight) {
    super(imageScr, spriteWidth, spriteHeight);
    this.newX = Math.random() * (CANVAS_WIDTH - this.width);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    // this.x = 0;
    // this.y = 0;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx4.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies1; i++) {
  enemies1.push(new FlappingEnemy("/assets/enemy1.png", 293, 155));
}
for (let i = 0; i < numberOfEnemies2; i++) {
  enemies2.push(new WigglyEnemy("/assets/enemy2.png", 266, 188));
}
for (let i = 0; i < numberOfEnemies3; i++) {
  enemies3.push(new SlidderingEnemy("/assets/enemy3.png", 218, 177));
}
for (let i = 0; i < numberOfEnemies4; i++) {
  enemies4.push(new SpinningEnemy("/assets/enemy4.png", 213, 213));
}

function animate() {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies1.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies2.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies3.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies4.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
