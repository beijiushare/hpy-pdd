<template>
  <div class="parent">
    <div class="div1"><img src="../img/star.gif" /></div>
    <div class="div2">
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
    </div>
    <div class="div3">
      <p>
        <a href="https://github.com/beijiushare/hpy-pdd" target="_blank"
          >@北酒</a
        >向您送去问候
      </p>
    </div>
    <div class="div4">
      <p>
        <a href="https://github.com/beijiushare/hpy-pdd" target="_blank"
          >别忘了给本项目点个Star⭐哦</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "begin",
  data() {
    return {
      text: "祝您新年快乐!",
    };
  },
};
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh; /* 设置容器高度为视口高度 */
}

.div1,
.div2,
.div3,
.div4 {
  display: flex;
  justify-content: center;
  /* border: #ffbb00 2px solid; */
}

.div1 {
  align-items: flex-end;
  height: 40vh;
}
.div2 {
  align-items: center;
  height: 20vh;
}
.div3 {
  align-items: flex-start;
  height: 25vh;
}

.div4 {
  align-items: center;
  height: 15vh;
}

img {
  position: relative;
  height: auto; /* 根据实际尺寸调整高度 */
  width: 40%; /* 调整宽度 */
  margin-bottom: 1px; /* 添加底部间距，使图片和文字之间有间隔 */
}

.welcome {
  position: relative;
  background: #ed03747f;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.572);
  border-radius: 10px;
  border: 5px solid #ffbb00;
  width: 88%;
  height: auto;
  padding: 8px;
  animation: slideIn 1s ease-out forwards;
  z-index: 1;
}

.welcome h1 {
  color: white;
  font-size: 35px;
  font-weight: bold;
  font-family: "Mengshen-Handwritten";
}

.welcome h1 span {
  display: inline-block;
  opacity: 0;
  animation: appear 0.5s forwards;
}

p {
  font-family: "huangkaihuaLawyerfont";
  font-weight: normal;
  color: #ffffff;
}

a {
  color: #ffffff; /* 设置链接颜色 */
  text-decoration: none; /* 去掉下划线 */
}

a:hover {
  text-decoration: underline; /* 鼠标悬停时显示下划线 */
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes appear {
  100% {
    opacity: 1;
  }
}
</style>
