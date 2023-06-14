import "@inkline/inkline/inkline.scss";

import "@primer/octicons/index.scss";
import "./main.scss";
import { Inkline, components } from "@inkline/inkline";
import App from "./App.vue";
import { createApp } from "vue";

const app = createApp(App);

app.use(Inkline, {
  components,
});

app.mount("#app");
