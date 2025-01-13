<template>
  <div class="celebrate">
    <h1>
      <span
        v-for="(char, index) in characters"
        :key="index"
        :style="{
          animationDelay: `${index * 0.5}s`,
          top: `${randomPosition().top}%`,
          left: `${randomPosition().left}%`,
          animationDelay: `${index * 0.5}s, ${5 + index * 0.5}s`, // 添加延迟以控制显示和消失
        }"
        class="bubble"
        >{{ char }}</span
      >
    </h1>
  </div>
</template>

<script>
export default {
  name: "celebrate",
  data() {
    return {
      characters: [
        "新年快乐!",
        "你太棒了！👏",
        "祝贺你🎉",
        "你怎么这么厉害！😎",
        "还得是你啊！💪",
        "今年超幸运！🍀",
        "666👍",
        "666👍",
        "蛇年大吉🐍",
        "你要好好的哦！🤗",
        "你真的很优秀！👏",
        "金蛇贺岁！🎉🐍",
        "你怎么这么厉害！😎",
        "还得是你！💪",
        "你太棒了！👏",
        "今年超幸运！🍀",
        "你要好好的哦！🤗",
        "你真的很优秀！👏",
        "未来可期哦！🚀",
        "小伙伴们一起加油！💪",
        "一起创造奇迹！✨",
        "每一天都要开开心心！😊",
        "继续努力！💪",
        "相信自己！💪",
        "梦想总能实现！✨",
        "勇往直前！🚀",
        "你有无限可能！✨",
        "不断进步！🚀",
        "我们一起成长！💪",
        "笑对每一天！😊",
        "祝你事事顺利！🍀",
        "勇敢追梦！🚀",
        "未来属于你！✨",
        "每一天都是新的开始！🌞",
        "保持热爱！❤️",
        "继续闪耀！✨",
        "你是最棒的！👏",
        "坚持就是胜利！🏆",
        "好运常伴！🍀",
        "心想事成！✨",
        "幸福满满！🥰",
        "快乐每一天！😊",
        "前途无量！🚀",
        "勇敢做自己！💪",
        "未来更加美好！✨",
        "加油加油！💪",
        "梦想成真！✨",
        "永远支持你！🤗",
        "一起走向辉煌！✨",
        "愿你笑口常开！😊",
        "生活充满阳光！🌞",
      ],
    };
  },
  methods: {
    randomPosition() {
      return {
        top: Math.random() < 0.5 ? Math.random() * 40 : 55 + Math.random() * 40,
        // 随机生成 top 位置，范围在 0~40% 或 55~95%
        left: Math.random() * 70 + 0, // 随机生成 left 位置，范围在 0~70%
      };
    },
  },
};
</script>

<style scoped>
.celebrate {
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
}

.bubble {
  position: absolute;
  display: inline-block;
  font-size: 15px;
  font-family: "Mengshen-Handwritten";
  font-weight: normal;
  color: white;
  background: #c55e56a2;
  border-radius: 10%;
  padding: 10px;
  opacity: 0;
  animation: appear 0.5s ease-out forwards, disappear 1s ease-in-out forwards; /* 添加延迟，使消失在显示后 5s */
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes disappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(0.8);
  }
  90% {
    opacity: 0;
    transform: scale(0.3);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
