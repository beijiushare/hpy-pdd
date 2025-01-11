<template>
  <div class="wrz_blog-fireworks-container">
    <canvas ref="fireworksCanvas" width="1000" height="1000"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const fireworksCanvas = ref(null);

onMounted(() => {
  const canvas = fireworksCanvas.value;
  const ctx = canvas.getContext("2d");

  // 获取实际显示的宽度和高度
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // 设置Canvas元素的实际宽度和高度
  canvas.width = displayWidth;
  canvas.height = displayHeight;

  // 缩放Canvas上下文以适应实际显示尺寸
  ctx.scale(displayWidth / canvas.width, displayHeight / canvas.height);

  const fireworks = [];

  class Particle {
    constructor(x, y, color, velocity, isExplosion = false) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = velocity;
      this.radius = isExplosion ? 5 : 1; // 调整点的大小
      this.alpha = 1;
      this.isExplosion = isExplosion;
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      if (this.isExplosion) {
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.velocity.x * 5, this.y + this.velocity.y * 5);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    update() {
      if (this.isExplosion) {
        this.x += this.velocity.x * 2;
        this.y += this.velocity.y * 2;
        this.radius -= 0.1; // 调整点的变小速度
      } else {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
      }
    }
  }

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const color = getRandomColor();
    const velocity = {
      x: Math.random() * 3 - 1.5,
      y: -Math.random() * 6 - 2,
    };

    const firework = new Particle(x, y, color, velocity);
    fireworks.push(firework);

    // 调整初始线的粗细和颜色
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + velocity.x * 5, y + velocity.y * 5);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8; // 调整线的粗细
    ctx.stroke();
  }

  function createExplosion(x, y, color) {
    const particles = [];
    const numParticles = Math.random() * 20 + 10;
    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI / 15) * i;
      const velocity = {
        x: Math.cos(angle) * (Math.random() * 5 + 2),
        y: Math.sin(angle) * (Math.random() * 5 + 2),
      };
      const isExplosion = Math.random() > 0.5;
      const particleColor = isExplosion ? color : getRandomColor();
      const particle = new Particle(x, y, particleColor, velocity, isExplosion);
      particles.push(particle);
    }
    fireworks.push(particles);
  }

  function getRandomColor() {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#ffa500",
      "#800080",
      "#ff6666",
      "#66ff66",
      "#6666ff",
      "#ffff66",
      "#ff66ff",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.2) {
      createFirework();
    }

    for (let i = 0; i < fireworks.length; i++) {
      const firework = fireworks[i];

      if (firework instanceof Particle) {
        firework.draw();
        firework.update();

        if (firework.alpha <= 0 || firework.radius <= 0) {
          const { x, y, color } = firework;
          fireworks.splice(i, 1);
          createExplosion(x, y, color);
        }
      } else if (Array.isArray(firework)) {
        for (let j = 0; j < firework.length; j++) {
          const particle = firework[j];
          particle.draw();
          particle.update();
        }

        if (
          firework.length > 0 &&
          (firework[0].alpha <= 0 || firework[0].radius <= 0)
        ) {
          fireworks.splice(i, 1);
          i--;
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});
</script>

<style scoped>
.wrz_blog-fireworks-container {
  position: fixed;
  bottom: 0;
  left: 0;
  top: -200px;
  height: 100%;
  width: 100%;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrz_blog-fireworks-container canvas {
  height: 100%;
  width: 100%;
  display: block;
}
</style>

<!-- 默认导出组件 -->
<script>
export default {
  name: "Fireworks",
};
</script>
