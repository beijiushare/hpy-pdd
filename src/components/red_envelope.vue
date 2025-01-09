<template>
  <div class="red_envelope" :style="speed"></div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "red_envelope",
  setup() {
    const speed = ref({});

    onMounted(() => {
      let x = Math.random() * window.innerWidth; // 随机水平位置
      //如果红包超出边框，则调整
      x = x > window.innerWidth * 0.8 ? x - window.innerWidth / 5 : x;
      let duration = Math.random() * 2 + 1; // 随机时间，控制下落速度，范围在3到8秒之间
      let scale = 0.5 + Math.random() * 0.5; // 随机缩放比例

      speed.value = {
        "animation-duration": duration + "s",
        left: x + "px",
        width: 62 * scale + "px",
        height: 92 * scale + "px",
        animationFillMode: "forwards", // 动画结束后保持最终状态
      };
    });

    return {
      speed,
    };
  },
};
</script>

<style scoped>
.red_envelope {
  position: absolute;
  background: url("../../red_envelope1.webp") no-repeat center center;
  background-size: cover;
  z-index: 3;
  animation: move linear forwards; /* 移除 infinite，添加 forwards */
  cursor: pointer;
}

@keyframes move {
  0% {
    transform: translateY(-520px); /* 从顶部开始 */
  }
  100% {
    transform: translateY(100vh); /* 到达视口底部 */
  }
}
</style>
