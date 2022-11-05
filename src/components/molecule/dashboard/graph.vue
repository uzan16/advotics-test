<template>
  <div>
    <vue-apex-charts
      width="100%"
      type="bar"
      :options="options"
      :series="series"
    />
    <div class="d-flex flex-row px-4">
      <span class='dot net wide mr-4'> Nett </span>
      <span class='dot gross wide mr-4'> Gross </span>
      <span class='dot apv wide mr-4'> Average Purchase Value </span>
      <span class='dot upt wide mr-4'> Unit per Transaction </span>
    </div>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "DashboardGraph",
  components: {
    VueApexCharts
  },
  props: {
    data: {
      default: () => []
    }
  },
  computed: {
    series: function () {
      let net = [],
        gross = [],
        apv = [];

      net = this.data.map((d) => ({
        x: d.key,
        y: d.net
      }));
      gross = this.data.map((d) => ({
        x: d.key,
        y: d.gross - d.net
      }));
      apv = this.data.map((d) => ({
        x: d.key,
        y: d.apv
      }));
      return [
        {
          name: "Net",
          type: "column",
          data: net
        },
        {
          name: "Gros",
          type: "column",
          data: gross
        },
        {
          name: "Apv",
          data: apv
        }
      ];
    },
    options: function () {
      const self = this;
      return {
        chart: {
          stacked: true,
          width: "100%",
          height: 380
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        markers: {
          size: 5,
          shape: "circle",
          radius: 2
        },
        stroke: {
          width: [0, 0, 4]
        },
        colors: ["#37B04C", "#289E45", "#FFE854"],
        noData: {
          text: "No Data Available",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "14px"
          }
        },
        tooltip: {
          custom: function (obj) {
            return self.generateTooltip(obj);
          }
        }
      };
    }
  },
  methods: {
    generateTooltip: function ({ dataPointIndex }) {
      if (dataPointIndex >= this.data.length) {
        return "";
      }
      const obj = this.data[dataPointIndex];
      return `
        <div class='px-4 py-2'>
          <span class='font-weight-bold text-caption'>${obj.key}</span>
          <table>
            <tr>
              <td>
                <span class='dot gross mr-4'> Gross</span>
              </td>
              <td>
                ${this.$helper.formatNumber(obj.gross)}
              </td>
            </tr>
            <tr>
              <td>
                <span class='dot net mr-4'> Nett</span>
              </td>
              <td>
                ${this.$helper.formatNumber(obj.net)}
              </td>
            </tr>
            <tr>
              <td>
                <span class='dot apv mr-4'> APV</span>
              </td>
              <td>
                ${this.$helper.formatNumber(obj.apv)}
              </td>
            </tr>
            <tr>
              <td>
                <span class='dot upt mr-4'> UPT</span>
              </td>
              <td>
                ${this.$helper.formatNumber(obj.upt)}
              </td>
            </tr>
          </table>
        </div>
      `;
    }
  }
};
</script>
<style>
.dot:before {
  content: "\A";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}
.dot.wide:before {
  width: 20px;
  border-radius: 4px;
}
.dot.gross:before {
  background-color: #289e45;
}
.dot.net:before {
  background-color: #37b04c;
}
.dot.apv:before {
  background-color: #ffe854;
}
.dot.upt:before {
  background-color: #707070;
}
</style>
