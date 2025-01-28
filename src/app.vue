<template>
  <div class="app" @click="onPageHit" :style="{ background: appBackground }">
    <!-- 默认显示的转盘组件 -->
    <Turntable v-if="showTurntable" :onStart="startWelcome" />
    <!-- 欢迎动画 -->
    <Welcome :showWelcome="showWelcome" :text="text" />
    <!-- 其他组件 -->
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
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import card from "./components/card.vue";
import red_envelope from "./components/red_envelope.vue";
import big_red_envelope from "./components/big_red_envelope.vue";
import Fireworks from "./components/firework.vue";
import begin from "./components/begin.vue";
import celebrate from "./components/celebrate.vue";
import Welcome from "./components/Welcome.vue";
import Turntable from "./components/Turntable.vue";

export default defineComponent({
  name: "App",
  components: {
    card,
    red_envelope,
    big_red_envelope,
    Fireworks,
    begin,
    celebrate,
    Welcome,
    Turntable,
  },
  setup() {
    const showTurntable = ref(true); // 控制 Turntable 组件的显示状态
    const showWelcome = ref(false);
    const text = ref("请收下你的独属祝福！");
    const showcard = ref(false);
    const showcard_container = ref(false);
    const showred_envelope = ref(false);
    const redEnvelopes = ref<number[]>([]);
    const appBackground = ref("#ffffff");
    const showbig_red_envelope = ref(false);
    const showfirework_container = ref(false);
    const showbegin = ref(false);
    const audio = ref<HTMLAudioElement | null>(null);
    const showcelebrate = ref(false);

    onMounted(() => {
      audio.value = new Audio(); // 初始化音频对象
    });

    onBeforeUnmount(() => {
      stopAudio(); // 清除组件时停止声音
    });

    const startWelcome = (event: MouseEvent) => {
      event.preventDefault(); // 防止默认行为（如果需要）
      showWelcome.value = true; // 显示欢迎动画
      showTurntable.value = false; // 隐藏转盘组件
      setTimeout(() => {
        showcard_container.value = true;
      }, 3500);
      setTimeout(() => {
        showcard.value = true;
      }, 4500);
    };

    const showRedEnvelope = () => {
      redEnvelopes.value = [];
      showred_envelope.value = true;
      startAddingRedEnvelopes();
      playAudio("https://cdn2.ear0.com:3321/preview?soundid=18013&type=mp3");
    };

    const startAddingRedEnvelopes = () => {
      const intervalId = setInterval(() => {
        if (redEnvelopes.value.length < 10000) {
          redEnvelopes.value.push(redEnvelopes.value.length + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 20);
    };

    const onPageHit = () => {
      if (showred_envelope.value && redEnvelopes.value.length >= 10) {
        redEnvelopes.value = [];
        showred_envelope.value = false;
        showcard.value = false;
        showcard_container.value = false;
        showWelcome.value = false;
        appBackground.value =
          "linear-gradient(to bottom, #7950f2 5%, #f783ac 95%)";
        showbig_red_envelope.value = true;
        stopAudio();
      }
    };

    const playAudio = (url: string) => {
      if (audio.value) {
        audio.value.src = url;
        audio.value.loop = true;
        audio.value.play().catch((error) => {
          console.error("音频播放失败:", error);
        });
      }
    };

    const stopAudio = () => {
      if (audio.value) {
        audio.value.pause();
        audio.value.currentTime = 0;
      }
    };

    const showfirework = () => {
      showfirework_container.value = true;
      playAudio("https://cdn2.ear0.com:3321/preview?soundid=36261&type=mp3");
      setTimeout(() => {
        showbig_red_envelope.value = false;
        showfirework_container.value = false;
        setTimeout(() => {
          showbegin.value = true;
          stopAudio();
          playAudio(
            "https://cdn2.ear0.com:3321/preview?soundid=42468&type=mp3"
          );
          setTimeout(() => {
            showcelebrate.value = true;
          }, 2500);
        }, 500);
      }, 5000);
    };

    return {
      showTurntable,
      showWelcome,
      text,
      showcard,
      showcard_container,
      showred_envelope,
      redEnvelopes,
      appBackground,
      showbig_red_envelope,
      showfirework_container,
      showbegin,
      audio,
      showcelebrate,
      startWelcome,
      showRedEnvelope,
      onPageHit,
      playAudio,
      stopAudio,
      showfirework,
    };
  },
});
</script>

<style>
.app {
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.card-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(63, 63, 63, 0.322);
}

.big_red_envelope {
  animation: appear 0.5s forwards;
}
</style>
