import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#00A551",
        // primaryDark: "#0D47A1",
        secondary: "#D1EDDB"
        // accent: "#00BCD4",
        // error: "#B71C1C",
        // info: "#2196F3",
        // success: "#4CAF50",
        // warning: "#FF8800",
        // progress: "#E6EE9C",
        // orange: "#D97D46",
        // tertiary: "#345345"
      }
    }
  }
});
