<template>
  <div class="turntable-container">
    <!-- 转盘图片 -->
    <img
      src="@/img/turntable.svg"
      alt="转盘"
      class="turntable"
      :class="{ rotating: isRotating }"
    />
    <!-- 开始按钮图片 -->
    <img
      src="@/img/start.svg"
      alt="开始"
      class="start-button"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "Turntable",
  props: {
    onStart: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
  },
  setup(props) {
    const isRotating = ref(false); // 控制旋转状态

    const handleClick = (event: MouseEvent) => {
      isRotating.value = true; // 开始旋转
      setTimeout(() => {
        isRotating.value = false; // 停止旋转
        props.onStart(event); // 调用父组件传递的 onStart 方法
      }, 3000); // 3 秒后调用
    };

    return {
      handleClick,
      isRotating,
    };
  },
});
</script>

<style scoped>
.turntable-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; /* 根据需要调整高度 */
  background-image: url("@/img/background.webp"); /* 替换为你的图片链接 */
  background-size: cover; /* 确保背景图片覆盖整个容器 */
  background-position: center; /* 确保背景图片居中显示 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}

.turntable {
  width: 300px; /* 根据需要调整转盘大小 */
  height: 300px;
  transition: transform 3s cubic-bezier(0.27, 0.34, 0.29, 1.03); /* 先快后慢的旋转动画 */
  position: relative;
  bottom: -90px;
}

.turntable.rotating {
  animation: rotate 3s cubic-bezier(0.27, 0.34, 0.29, 1.03) forwards; /* 先快后慢的旋转动画 */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.start-button {
  width: 80px; /* 根据需要调整按钮图片大小 */
  height: 160px;
  cursor: pointer;
  position: relative;
  top: -10px; /* 稍稍上移按钮 */
}

.start-button:hover {
  opacity: 0.8; /* 鼠标悬停时的透明度效果 */
}
</style>
