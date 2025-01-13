<template>
  <div class="big_red_envelope">
    <p1>北酒的红包</p1>
    <p2 v-if="showmessage">新年快乐&nbsp;&nbsp;金蛇贺岁</p2>
    <div class="img1" v-if="showmessage"></div>
    <div class="wrapper" id="wrap">
      <div class="arc-continer" id="continer"></div>
    </div>
    <div class="circle" @click="Receive($event)" v-if="showmessage">
      <h1>開</h1>
    </div>
    <p3 v-if="showmoney">恭喜你抢到{{ money }}元红包</p3>
    <div class="img2" v-if="showbox"></div>
  </div>
</template>

<script>
export default {
  name: "big_red_envelope",
  data() {
    return {
      showmessage: true,
      showmoney: false,
      showbox: false,
      money: 100000000,
    };
  },
  methods: {
    Receive(event) {
      event.currentTarget.classList.toggle("rotate"); // 切换.rotate类

      setTimeout(() => {
        this.showmessage = false; // 隐藏红包
        this.showmoney = true; // 重置红包金额
        this.showbox = true; // 显示红包盒子
        this.$emit("Receive"); // 发出事件给父组件
      }, 1500);
    },
  },
};
</script>

<style scoped>
.big_red_envelope {
  position: relative;
  width: 70%;
  height: 60%;
  background: linear-gradient(to bottom, #f75504 5%, #c70ec7 95%);
  border: 2px solid rgb(255, 255, 255);
  border-radius: 10px;
  z-index: 5;
  display: flex; /* 设置为 Flexbox */
  flex-direction: column; /* 使元素按列排列 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 0%;
  font-family: "Source Han Serif SC VF";
}

p1 {
  font-size: 20px;
  text-align: center; /* 水平居中 */
  margin: 0; /* 去除默认的外边距 */
  color: white;
  margin-top: 15%;
}

p2 {
  font-size: 22px;
  text-align: center; /* 水平居中 */
  margin: 0; /* 去除默认的外边距 */
  color: rgb(255, 217, 1);
  margin-top: 2%;
}

.img1 {
  position: absolute;
  height: 38%;
  width: 50%;
  margin-top: 3%;
  background-image: url("../img/gold_snake.webp");
  background-size: cover; /* 确保背景图像覆盖整个元素 */
}

.img2 {
  position: absolute;
  height: 50%;
  width: 80%;
  margin-top: 68%;
  background-image: url("../img/box.gif");
  background-size: cover; /* 确保背景图像覆盖整个元素 */
}

.wrapper {
  width: 100%;
  height: 300%;
  position: relative;
  overflow: hidden;
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 向上对齐（顶部对齐） */
}

.arc-continer {
  width: 100%;
  /* 高度设置为 圆弧形状整体高度 */
  height: 600px;
  background-color: transparent;
  position: relative;
}

/* 绘制椭圆 :长半轴为容器宽度*2左右,短半轴为容器宽度*1 左右 -- 可以根据需要进行微调*/
.arc-continer::after {
  content: "";
  width: 200%;
  height: 350px;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  /* 绘制为椭圆 */
  border: #ffffff 1px solid;
  border-radius: 100% /100%;
  /* top 为  椭圆高度 - arc-continer高度*/
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
}

.circle {
  width: 20vw; /* 宽度为视口宽度的 10% */
  height: 20vw; /* 高度与宽度相同 */
  display: grid; /* 使用 Grid */
  place-items: center; /* 水平和垂直居中 */
  background-color: rgb(252, 185, 0);
  border: rgb(230, 210, 153) 5px solid;
  border-radius: 50%;
  position: absolute;
  bottom: 7%;
}

.rotate {
  animation: rotate linear 0.5s infinite;
}

@keyframes rotate {
  from {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

h1 {
  font-size: 35px;
  font-style: normal; /* 正常字体样式 */
  transform: skew(-7deg); /* 10度倾斜 */
  text-align: center; /* 水平居中 */
  margin: 0; /* 去除默认的外边距 */
  color: rgb(168, 12, 12);
}

p3 {
  position: absolute;
  font-size: 25px;
  text-align: center; /* 水平居中 */
  margin: 0; /* 去除默认的外边距 */
  color: rgb(240, 201, 6);
  margin-bottom: 60%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
