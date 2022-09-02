import { createApp } from "vue";
import App from "./App.vue";

import { Inkline, components } from "@inkline/inkline";
import "@inkline/inkline/inkline.scss";

import "@primer/octicons/index.scss";
import "./main.scss";

const app = createApp(App);

app.use(Inkline, {
  components,
});

app.mount("#app");
