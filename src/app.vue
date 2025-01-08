<template>
  <div class="app">
    <div class="welcome">
      <h1>
        <span
          v-for="(char, index) in text"
          :key="index"
          :style="{ animationDelay: `${1 + index * 0.2}s` }"
          >{{ char }}</span
        >
      </h1>
    </div>
    <div class="card-container" v-if="showcard_container">
      <card v-if="showcard"></card>
      <!-- 修改这里 -->
    </div>
  </div>
</template>

<script lang="ts">
import card from "./components/card.vue";

export default {
  name: "App",
  components: {
    card,
  },
  data() {
    return {
      text: "恭喜您！抽奖成功！",
      showcard: false,
      showcard_container: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showcard_container = true; // 3 秒后显示组件
    }, 4500);
    setTimeout(() => {
      this.showcard = true; // 6 秒后显示组件
    }, 5500);
  },
};
</script>

<style>
.app {
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.welcome {
  background: #ed1303;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.572);
  border-radius: 0px;
  border: 5px solid #ffbb00;
  width: 88%;
  padding: 10px;
  animation: slideIn 1s ease-out forwards; /* 添加从左往右进入的动画 */
  position: relative; /* 为 z-index 提供上下文 */
  z-index: 1; /* 设置 welcome 的层级 */
}

.welcome h1 {
  color: white;
  font-size: 35px;
  font-weight: bold;
}

.welcome h1 span {
  display: inline-block;
  opacity: 0;
  animation: appear 0.5s forwards;
}

.card-container {
  position: absolute; /* 绝对定位，覆盖在 welcome 之上 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 居中偏移 */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 2; /* 设置 card 的层级高于 welcome */
  background: rgba(63, 63, 63, 0.322);
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
