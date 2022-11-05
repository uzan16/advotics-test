<template>
  <content-wrapper>
    <template v-slot:top-section>
      <div class="page-title">Dashboard</div>
      <v-spacer />
      <date-range-picker
        v-model="dates"
        :min="datesMinMax[0]"
        :max="datesMinMax[1]"
        @change="() => getData()"
      />
    </template>
    <v-expansion-panels flat tile v-model="panel">
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header dark color="#37B04C" disable-icon-rotate>
          <span class="panel-header white--text"> Market Insights </span>
          <template v-slot:actions>
            <div class="d-flex flex-row align-center">
              <v-icon color="white">mdi-lightbulb-on-outline</v-icon>
              <a href="javascript:void(0)" class="white--text mx-2"
                >Click Here for Help</a
              >
              <v-icon
                color="white"
                class="expand-icon"
                :class="{ expanded: panel === 0 }"
                >mdi-chevron-down</v-icon
              >
            </div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="transparent no-padding panel-content">
          <v-row>
            <v-col cols="8" sm="6" md="4" lg="3" xl="2">
              <small-card>
                <template v-slot:title> Sales Turnover </template>
                <div class="d-flex flex-row align-center">
                  <div class="d-flex flex-column">
                    <span class="text-amount mb-2">
                      {{ $helper.formatNumber(salesTurnOver.value, 0, "Rp ") }}
                    </span>
                    <span class="text-caption">
                      <v-icon
                        v-if="salesTurnOver.percentage < 0"
                        color="red"
                        x-small
                        >mdi-arrow-down-bold</v-icon
                      >
                      <v-icon v-else color="green" x-small
                        >mdi-arrow-up-bold</v-icon
                      >
                      <span
                        class="font-weight-bold"
                        :class="
                          salesTurnOver.percentage < 0
                            ? 'red--text'
                            : 'green--text'
                        "
                      >
                        {{
                          $helper.formatNumber(
                            Math.abs(salesTurnOver.percentage),
                            1
                          )
                        }}%
                      </span>
                      last period in products sold
                    </span>
                  </div>
                  <v-img
                    class="small-card-icon"
                    contain
                    :src="require(`@/assets/icon/sales-turnover.png`)"
                  />
                </div>
              </small-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" xl="8">
              <medium-card>
                <template v-slot:title> Average Purchase Value </template>
                <template v-slot:sub-title>
                  <date-range-picker
                    v-model="dates"
                    :small="true"
                    :min="datesMinMax[0]"
                    :max="datesMinMax[1]"
                    @change="() => getData()"
                  />
                </template>
                <graph :data="graph" />
              </medium-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" xl="2">
              <medium-card>
                <template v-slot:title> Best Selling SKU </template>
                <sku-list :data="bestSelling" />
              </medium-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" xl="2">
              <medium-card>
                <template v-slot:title> Top Competitor SKU </template>
                <sku-list :data="competitorSelling" />
              </medium-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </content-wrapper>
</template>

<script>
import {
  SmallCard,
  MediumCard,
  Graph,
  SkuList
} from "@/components/molecule/dashboard";
import DateRangePicker from "@/components/atom/date-range-picker";
import jsonGraph from "@/data/graph.json";
import jsonSku from "@/data/sku.json";

export default {
  name: "AppDashboard",
  components: {
    SmallCard,
    MediumCard,
    Graph,
    SkuList,
    DateRangePicker
  },
  data() {
    return {
      dummyGraph: jsonGraph,
      dummySku: jsonSku,
      isLoading: false,
      panel: 0,
      dates: [],
      datesMinMax: [],
      salesTurnOver: {
        value: 3600000,
        percentage: -13.8
      },
      graph: [],
      bestSelling: [],
      competitorSelling: []
    };
  },
  mounted: function () {
    let now = new Date();
    // set default date for date picker
    this.dates = [
      this.$moment(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      ).format("YYYY-MM-DD"),
      this.$moment(
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      ).format("YYYY-MM-DD")
    ];
    // set min max date for date picker
    this.datesMinMax = [
      this.$moment(
        new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
      ).format("YYYY-MM-DD"),
      this.$moment(
        new Date(now.getFullYear(), now.getMonth(), now.getDate())
      ).format("YYYY-MM-DD")
    ];
    this.getData();
  },
  methods: {
    // concurrent get data process using promise.all
    getData: async function () {
      this.isLoading = true;
      try {
        await Promise.all[
          (this.getBestSelling(),
          this.getCompetitorSelling(),
          this.getGraph(),
          this.getSmallCardData(),
          this.$helper.sleep(1000))
        ];
      } catch (e) {
        // TODO: handle error
      } finally {
        this.isLoading = false;
      }
    },
    getBestSelling: async function () {
      // just load dummy
      this.bestSelling = this.dummySku
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    getCompetitorSelling: async function () {
      // just load dummy
      this.competitorSelling = this.dummySku
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
    getGraph: async function () {
      // just load dummy process
      if (this.dates.length !== 2) {
        this.graph = [];
        return;
      }
      let length = this.$moment(this.dates[1]).diff(this.dates[0], "days") + 1;
      let step = 1;
      if (length > 7) {
        step = Math.floor(length / 7);
        length = Math.floor(length / (length / 7));
      }
      let m = this.$moment(this.dates[0]);
      this.graph = Array.from({ length }, () =>
        Math.floor(Math.random() * 360)
      ).map((i) => {
        const obj = this.dummyGraph[i];
        return {
          key: m.add(step, "days").format("DD/MM/YYYY"),
          ...obj
        };
      });
    },
    getSmallCardData: async function () {
      this.salesTurnOver = {
        value: this.$helper.random(100000, 1000000),
        percentage: this.$helper.random(-100, 100)
      };
    }
  }
};
</script>
<style scoped>
.panel-header {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.25em;
}
.expand-icon {
  transition: transform 250ms ease;
  -moz-transition: -moz-transform 250ms ease;
  -ms-transition: -ms-transform 250ms ease;
  -o-transition: -o-transform 250ms ease;
  -webkit-transition: -webkit-transform 250ms ease;
}
.expand-icon.expanded {
  transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
}
.text-amount {
  font-size: 1.5em;
  font-weight: bold;
}
.small-card-icon {
  height: 48px;
  width: 48px;
}
</style>
