import moment from "moment";

export default {
  install(Vue) {
    Vue.prototype.$helper = {
      formatNumber: function (value, decimalPlace = 0, prefix = "") {
        let val = (value / 1).toFixed(decimalPlace);
        return (
          (prefix ? prefix + " " : "") +
          val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      },
      sleep: function (ms) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, ms);
        });
      },
      random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    };
    Vue.prototype.$moment = moment;
  }
};
