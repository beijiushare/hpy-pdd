import { createApp } from "vue";
import App from "./app.vue";
import Vant from "vant";
import "vant/lib/index.css";

const app = createApp(App);
app.use(Vant);
app.mount("#app");
