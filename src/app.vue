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
    <big_red_envelope
      v-if="showbig_red_envelope"
      @Receive="showfirework"
    ></big_red_envelope>
    <Fireworks v-if="showfirework_container"></Fireworks>
    <begin v-if="showbegin"></begin>
    <celebrate v-if="showcelebrate"></celebrate>
  </div>
</template>

<script lang="ts">
import card from "./components/card.vue";
import red_envelope from "./components/red_envelope.vue";
import big_red_envelope from "./components/big_red_envelope.vue";
import Fireworks from "./components/firework.vue";
import begin from "./components/begin.vue";
import celebrate from "./components/celebrate.vue";

export default {
  name: "App",
  components: {
    card,
    red_envelope,
    big_red_envelope,
    Fireworks,
    begin,
    celebrate,
  },
  data() {
    return {
      showwelcome: true,
      text: "快来领压岁钱啰！",
      showcard: false,
      showcard_container: false,
      showred_envelope: false,
      intervalId: null as number | null,
      redEnvelopes: [] as Array<number>,
      appBackground: "#ffffff",
      showbig_red_envelope: false,
      showfirework_container: false,
      showbegin: false,
      audio: null as HTMLAudioElement | null, // 声音对象
      showcelebrate: false, // 庆祝(气泡)
    };
  },
  mounted() {
    this.audio = new Audio(); // 初始化音频对象
    setTimeout(() => {
      this.showcard_container = true;
    }, 3500);
    setTimeout(() => {
      this.showcard = true;
    }, 4500);
  },
  beforeDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.stopAudio(); // 清除组件时停止声音
  },
  methods: {
    showRedEnvelope() {
      this.redEnvelopes = [];
      this.showred_envelope = true;
      this.startAddingRedEnvelopes();
      this.playAudio(
        "https://cdn2.ear0.com:3321/preview?soundid=18013&type=mp3"
      ); // 播放红包声音
      this.onPageHit();
    },
    startAddingRedEnvelopes() {
      this.intervalId = setInterval(() => {
        if (this.redEnvelopes.length < 10000) {
          this.redEnvelopes.push(this.redEnvelopes.length + 1);
        } else {
          clearInterval(this.intervalId!);
          this.intervalId = null;
        }
      }, 20);
    },
    onPageHit() {
      if (this.showred_envelope === true && this.redEnvelopes.length >= 10) {
        this.redEnvelopes = [];
        this.showred_envelope = false;
        this.showcard = false;
        this.showcard_container = false;
        this.showwelcome = false;
        this.appBackground =
          "linear-gradient(to bottom, #7950f2 5%, #f783ac 95%)";
        this.showbig_red_envelope = true;
        this.stopAudio(); // 停止声音
        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    },
    playAudio(url: string) {
      if (this.audio) {
        this.audio.src = url; // 设置音频源
        this.audio.loop = true; // 设置为循环播放
        this.audio.play();
      }
    },
    stopAudio() {
      if (this.audio) {
        this.audio.pause(); // 暂停音频
        this.audio.currentTime = 0; // 重置音频时间
      }
    },
    showfirework() {
      this.showfirework_container = true;
      this.playAudio(
        "https://cdn2.ear0.com:3321/preview?soundid=36261&type=mp3"
      ); // 播放烟花声音
      setTimeout(() => {
        this.showbig_red_envelope = false;
        this.showfirework_container = false;
        setTimeout(() => {
          this.showbegin = true; // 3.5 秒后显示组件
          this.stopAudio();
          this.playAudio(
            "https://cdn2.ear0.com:3321/preview?soundid=42468&type=mp3"
          );
          setTimeout(() => {
            this.showcelebrate = true;
          }, 2500);
        }, 500);
      }, 5000);
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
  font-size: 35px;

  font-family: "Mengshen-Handwritten";
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

<!-- 音乐：Hamili - Lunary (Vlog No Copyright Music) 厂牌：Vlog No Copyright Music
地址：https://www.youtube.com/watch?v=pUUxWCmW7xg
 -->
