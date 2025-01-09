<template>
  <div class="card" :class="{ 'card-glow': showGlow }">
    <div class="card-background"></div>
    <div class="card-content">
      <div class="card-header">
        <h1>
          <span
            v-for="(line, index) in lines"
            :key="index"
            :style="{ animationDelay: `${index * 0.9}s` }"
            >{{ line }}</span
          >
        </h1>
        <h2>
          <span
            v-for="(line, index) in name_lines"
            :key="index"
            :style="{ animationDelay: `${lines.length * 0.5 + index * 0.9}s` }"
            >{{ line }}</span
          >
        </h2>
      </div>
      <div class="card-body">
        <p>
          <span
            v-for="(line, index) in bodyLines"
            :key="index"
            :style="{
              animationDelay: `${
                lines.length * 0.5 + name_lines.length * 0.8 + index * 0.9
              }s`,
            }"
            >{{ line }}</span
          >
        </p>
        <div class="important_text">
          <span
            v-for="(line, index) in important_text"
            :key="index"
            :style="{
              animationDelay: `${
                bodyLines.length * 0.9 +
                lines.length * 0.9 +
                name_lines.length * 0.8 +
                index * 0.9
              }s`,
            }"
            >{{ line }}</span
          >
        </div>
        <div class="important_image">
          <img
            src="../img/important_image.webp"
            alt="Important Image"
            loading="lazy"
            :style="{
              animationDelay: `${
                bodyLines.length * 0.9 +
                lines.length * 0.9 +
                name_lines.length * 0.8 +
                important_text.length * 0.9
              }s`,
            }"
          />
        </div>
      </div>
      <div class="card-footer">
        <button @click="handleClick">领取礼物</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      lines: ["热 烈 祝 贺"], // 标题行
      name_lines: ["黑子轩女士："], // 标题行
      bodyLines: [
        "由于你行善积德、品行高尚",
        "这辈子福源深厚",
        // "你以后的生活一定会：",
        "所以你一定会：",
      ], // 内容行
      important_text: ["请我吃饭！"], // 重要行
      showGlow: false, // 添加此属性以消除警告
    };
  },
  methods: {
    handleClick() {
      this.$emit("handle-click"); // 发出事件给父组件
    },
  },
};
</script>

<style scoped>
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card {
  width: 80%;
  height: 70%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border-radius: 10px;
  border: solid 1.25em;
  border-image: conic-gradient(
      from var(--a),
      #669900,
      #99cc33,
      #ccee66,
      #006699,
      #3399cc,
      #990066,
      #cc3399,
      #ff6600,
      #ff9900,
      #ffcc00,
      #669900
    )
    1;
  cursor: pointer;
  animation: card_appear 0.5s forwards, a 4s linear infinite;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../img/card_background.webp");
  background-size: cover;
  background-position: center;
  z-index: -1; /* 将背景放在内容后面 */
}

.card-content {
  position: relative;
  z-index: 1; /* 将内容放在背景前面 */
  padding: 20px;
  color: white;
  text-align: center;
}

.card-header h1 {
  color: #d15716;
  margin-top: 30px;
  font-size: 30px;
  font-weight: 900;
  -webkit-text-stroke: 2px; /* 描边宽度和颜色 */
}

.card-header h2 {
  color: #d15716;
  margin-top: 55px;
  margin-left: 5px;
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  -webkit-text-stroke: 1.5px;
  line-height: 0.5;
}

.card-body p {
  margin-top: 10px;
  font-size: 20px;
  -webkit-text-stroke: 1px;
  color: #aa3f0d;
  line-height: 1.5;
}

.card-body .important_text {
  line-height: 0.5;
  font-size: 35px;
  color: #e7160d;
  font-weight: bold;
  -webkit-text-stroke: 1.5px;
}

.card-body .important_image {
  margin-top: 15px;
  margin-right: 0px;
  text-align: right; /* 图片右侧对齐 */
}

.card-body .important_image img {
  width: 100px; /* 调整图片大小 */
  height: auto;
  opacity: 0;
  animation: appear 0.1s forwards; /* 应用动画 */
}

.card-header h1 span {
  display: block; /* 每行单独显示 */
  opacity: 0;
  animation: lines_appear 0.5s forwards;
}

.card-header h2 span,
.card-body .important_text span,
.card-body p span {
  display: block; /* 每行单独显示 */
  opacity: 0;
  animation: appear 0.1s forwards;
}

.card-footer {
  margin-top: 7px;
}

.card-footer button {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  background: #fd3c2d;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.card-footer button:hover {
  background: #ffaf01;
}

@keyframes lines_appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes appear {
  0% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes card_appear {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes a {
  to {
    --a: 1turn;
  }
}
</style>
