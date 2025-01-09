<template>
  <div class="app" @click="onPageHit" :style="{ background: appBackground }">
    <!-- 这里的 click 事件处理器用于监听页面点击 -->
    <div class="welcome" v-if="showwelcome">
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
      <card v-if="showcard" @handle-click="showRedEnvelope"></card>
    </div>
    <div v-if="showred_envelope">
      <red_envelope
        v-for="(item, index) in redEnvelopes"
        :key="index"
      ></red_envelope>
    </div>
    <big_red_envelope v-if="showbig_red_envelope"></big_red_envelope>
  </div>
</template>

<script lang="ts">
import card from "./components/card.vue";
import red_envelope from "./components/red_envelope.vue";
import big_red_envelope from "./components/big_red_envelope.vue";

export default {
  name: "App",
  components: {
    card,
    red_envelope,
    big_red_envelope,
  },
  data() {
    return {
      showwelcome: true,
      text: "恭喜您！抽奖成功！",
      showcard: false,
      showcard_container: false,
      showred_envelope: false,
      intervalId: null as number | null, // 定时器 ID
      redEnvelopes: [] as Array<number>, // 红包数组
      appBackground: "#ffffff", // 初始背景颜色
      showbig_red_envelope: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showcard_container = true; // 3 秒后显示组件
    }, 3500);
    setTimeout(() => {
      this.showcard = true; // 6 秒后显示组件
    }, 4500);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    showRedEnvelope() {
      this.redEnvelopes = []; // 清空红包数组
      this.showred_envelope = true; // 显示红包
      this.startAddingRedEnvelopes(); // 启动红包添加
      this.onPageHit();
    },
    startAddingRedEnvelopes() {
      // 启动定时器，每 5 秒增加一个红包
      this.intervalId = setInterval(() => {
        if (this.redEnvelopes.length < 10000) {
          this.redEnvelopes.push(this.redEnvelopes.length + 1); // 添加一个红包
        } else {
          clearInterval(this.intervalId!);
          this.intervalId = null; // 将 intervalId 设为 null，表示定时器已停止
        }
      }, 20); // 每 5 秒添加一个红包
    },
    onPageHit() {
      if (this.showred_envelope === true && this.redEnvelopes.length >= 10) {
        // 当页面被点击时清空红包
        this.redEnvelopes = []; // 清空红包数组
        this.showred_envelope = false; // 隐藏红包
        this.showcard = false; // 隐藏卡片
        this.showcard_container = false; // 隐藏卡片容器
        this.showwelcome = false; // 显示欢迎语
        this.appBackground =
          "linear-gradient(to bottom, #7950f2 5%, #f783ac 95%)";
        this.showbig_red_envelope = true;
        if (this.intervalId !== null) {
          clearInterval(this.intervalId); // 停止定时器
          this.intervalId = null; // 重置定时器 ID
        }
      }
    },
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
  cursor: pointer;
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
  animation: slideIn 1s ease-out forwards; /* 从左往右进入的动画 */
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

.big_red_envelope {
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
