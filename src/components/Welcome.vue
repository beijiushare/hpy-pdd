<template>
  <div class="welcome" v-if="showWelcome">
    <h1>
      <span
        v-for="(char, index) in text"
        :key="index"
        :style="{ animationDelay: `${1 + index * 0.2}s` }"
        >{{ char }}</span
      >
    </h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "Welcome",
  props: {
    showWelcome: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "请收下您的独属祝福！",
    },
  },
};
</script>

<style scoped>
.welcome {
  background: #ed1303;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.572);
  border-radius: 3px;
  border: 5px solid #ffbb00;
  box-shadow: 0 0 20px rgba(255, 187, 0, 0.8),
    /* 发光效果 */ 0 0 30px rgba(255, 187, 0, 0.5); /* 较离边框远的发光效果 */
  width: 88%;
  padding: 10px;
  animation: slideIn 1s ease-out forwards; /* 从左往右进入的动画 */
  position: relative; /* 为 z-index 提供上下文 */
  z-index: 1; /* 设置 welcome 的层级 */
}

.welcome h1 {
  color: white;
  font-size: 30px;
  font-family: "Mengshen-Handwritten";
}

.welcome h1 span {
  display: inline-block;
  opacity: 0;
  animation: appear 0.5s forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(3.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%); /* 从左边开始 */
    opacity: 0;
  }
  100% {
    transform: translateX(0); /* 移动到正常位置 */
    opacity: 1;
  }
}
</style>
