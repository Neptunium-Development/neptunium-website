
class Ball {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }
  
  applyForce(cursorX, cursorY, forceRadius) {
    const distance = Math.hypot(cursorX - this.x, cursorY - this.y);

    if (distance < forceRadius) {
      const forceStrength = 1 - distance / forceRadius;
      const forceDirectionX = (cursorX - this.x) / distance;
      const forceDirectionY = (cursorY - this.y) / distance;

      this.dx += forceStrength * forceDirectionX;
      this.dy += forceStrength * forceDirectionY;
    } else {
      // Apply friction when the balls are moving at high speeds
      const speed = Math.hypot(this.dx, this.dy);
      const maxSpeed = 8;

      if (speed > maxSpeed) {
        this.dx *= 0.20;
        this.dy *= 0.20;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 20);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx, canvas) {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw(ctx);
  }
}

function randomColor() {
  const colors = [
    "rgba(173, 216, 230, 0.7)",
    "rgba(135, 206, 235, 0.7)",
    "rgba(106, 90, 205, 0.7)",
    "rgba(138, 43, 226, 0.7)"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBalls() {
  const balls = [];
  for (let i = 0; i < 150; i++) {
    const radius = 10 + Math.random() * 10;
    const x = radius + Math.random() * (window.innerWidth - 2 * radius);
    const y = radius + Math.random() * (window.innerHeight - 2 * radius);
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const color = randomColor();
    balls.push(new Ball(x, y, radius, color, dx, dy));
  }
  return balls;
}

function animate(canvas, ctx, balls) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.update(ctx, canvas);
  });
  requestAnimationFrame(() => animate(canvas, ctx, balls));
}

document.addEventListener("DOMContentLoaded", () => {
  const stormcphImage = document.getElementById("stormcph-image");
  stormcphImage.src = "https://raw.githubusercontent.com/LuminaDevelopment/LuminaWebsite/main/src/PfpTest1(1).jpg";

  const qweruImage = document.getElementById("qweru-image");
  qweruImage.src = "https://raw.githubusercontent.com/LuminaDevelopment/LuminaWebsite/main/src/qwery.jpg";
  
  const corruptionImage = document.getElementById("CorruptionHades-image");
  corruptionImage.src = "https://raw.githubusercontent.com/LuminaDevelopment/LuminaWebsite/main/src/CorruptionHades.jpg";

  const canvas = document.getElementById("floating-balls");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const balls = createBalls();

  const cursor = { x: -1000, y: -1000 };
  document.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
  });

  animate(canvas, ctx, balls, cursor);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

function animate(canvas, ctx, balls, cursor) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.applyForce(cursor.x, cursor.y, 400);
    ball.update(ctx, canvas);
  });
  requestAnimationFrame(() => animate(canvas, ctx, balls, cursor));
}
