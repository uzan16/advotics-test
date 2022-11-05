<template>
  <v-menu
    v-model="dateRangeShown"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    offset-x
    min-width="600px"
    class="date-range-picker"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="date-activator text-body-2" :outlined="small">
        <template v-if="!small">
          <v-icon class="mr-3">mdi-calendar-month-outline</v-icon>
          <span class="grey--text text--darken-1 mr-3">Period</span>
        </template>
        <span class="grey--text text--darken-3 mr-3">{{
          selectedDateStr
        }}</span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-card class="date-range-picker">
      <v-card-title class="d-flex text-h6 grey--text text--darken-2">
        <v-icon class="mr-3">mdi-calendar-month-outline</v-icon>
        Period
        <v-spacer />
        <v-btn icon small plain :ripple="false" @click="dateRangeShown = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-4 py-6">
        <v-row>
          <v-col class="py-0 template-wrapper">
            <v-list class="pt-0">
              <v-list-item
                v-for="item in templates"
                :key="item.value"
                @click="() => handleTemplate(item.value)"
                class="text-body-2 grey--text text--darken-2"
                :class="{ selected: activeTemplate === item.value }"
              >
                {{ item.label }}
              </v-list-item>
              <v-list-item
                class="text-body-2 grey--text text--darken-2"
                :class="{ selected: activeTemplate === 'custom' }"
              >
                Custom
              </v-list-item>
            </v-list>
            <v-btn color="primary" @click="save" block> Apply </v-btn>
          </v-col>
          <v-divider vertical />
          <v-col class="py-0">
            <v-date-picker
              v-model="dateRange1"
              no-title
              range
              scrollable
              color="secondary"
              :show-current="false"
              @change="(e) => updateModel(e, 'first')"
              :picker-date.sync="pickerDate1"
              :min="min"
              :max="max"
            >
            </v-date-picker>
          </v-col>
          <v-col class="py-0">
            <v-date-picker
              v-model="dateRange1"
              no-title
              range
              scrollable
              color="secondary"
              :show-current="false"
              @change="(e) => updateModel(e, 'second')"
              :picker-date.sync="pickerDate2"
              :min="min"
              :max="max"
            >
            </v-date-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "DateRangePicker",
  props: {
    value: {
      default: function () {
        return [];
      }
    },
    small: {
      default: false
    },
    min: {
      default: undefined
    },
    max: {
      default: undefined
    }
  },
  data: () => ({
    templates: [
      {
        value: "today",
        label: "Today"
      },
      {
        value: "yesterday",
        label: "Yesterday"
      },
      {
        value: "7days",
        label: "Last 7 days"
      },
      {
        value: "30days",
        label: "Last 30 days"
      },
      {
        value: "month",
        label: "This Month"
      }
    ],
    dateRangeShown: false,
    dateRange1: [],
    tempModel: [],
    pickerDate1: null,
    pickerDate2: null
  }),
  watch: {
    dateRangeShown: {
      handler: function (val) {
        if (val) {
          this.updateModel(this.localModel);
        }
      }
    },
    pickerDate1: function (e) {
      const m = this.$moment(e);
      if (!m.isBefore(this.pickerDate2, "month")) {
        this.pickerDate1 = m.subtract(1, "months").format("YYYY-MM-DD");
      }
    },
    pickerDate2: function (e) {
      const m = this.$moment(e);
      if (!m.isAfter(this.pickerDate1, "month")) {
        this.pickerDate2 = m.add(1, "months").format("YYYY-MM-DD");
      }
    }
  },
  computed: {
    localModel: {
      get() {
        return this.value;
      },
      set(localModel) {
        this.$emit("input", localModel);
        this.$emit("change", localModel);
      }
    },
    dateRangeText: function () {
      const moment = this.$moment;
      return this.localModel
        ? this.localModel
            .map((x) =>
              moment(x).isValid() ? moment(x).format("DD MMM YYYY") : ""
            )
            .join(" - ")
        : "";
    },
    activeTemplate: function () {
      return this.getActiveTemplateFromDate(this.tempModel);
    },
    selectedDateStr: function () {
      const obj = this.templates.find(
        (x) => x.value === this.getActiveTemplateFromDate(this.value)
      );
      return obj?.label || this.dateRangeText;
    },
    _today: function () {
      const now = new Date();
      return [
        this.$moment(now).format("YYYY-MM-DD"),
        this.$moment(now).format("YYYY-MM-DD")
      ];
    },
    _yesterday: function () {
      const now = new Date();
      return [
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).format("YYYY-MM-DD"),
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).format("YYYY-MM-DD")
      ];
    },
    _7days: function () {
      const now = new Date();
      return [
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        ).format("YYYY-MM-DD"),
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).format("YYYY-MM-DD")
      ];
    },
    _30days: function () {
      const now = new Date();
      return [
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
        ).format("YYYY-MM-DD"),
        this.$moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        ).format("YYYY-MM-DD")
      ];
    },
    _month: function () {
      const now = new Date();
      return [
        this.$moment(new Date(now.getFullYear(), now.getMonth(), 1)).format(
          "YYYY-MM-DD"
        ),
        this.$moment(new Date(now)).format("YYYY-MM-DD")
      ];
    }
  },
  methods: {
    getActiveTemplateFromDate: function (dates) {
      if (dates.length !== 2) {
        return "custom";
      }
      const [t1, t2] = dates;
      {
        const [d1, d2] = this._today;
        if (t1 === d1 && t2 === d2) {
          return "today";
        }
      }
      {
        const [d1, d2] = this._yesterday;
        if (t1 === d1 && t2 === d2) {
          return "yesterday";
        }
      }
      {
        const [d1, d2] = this._7days;
        if (t1 === d1 && t2 === d2) {
          return "7days";
        }
      }
      {
        const [d1, d2] = this._30days;
        if (t1 === d1 && t2 === d2) {
          return "30days";
        }
      }
      {
        const [d1, d2] = this._month;
        if (t1 === d1 && t2 === d2) {
          return "month";
        }
      }
      return "custom";
    },
    updateModel: function (dt, type = "first") {
      this.dateRange1 = [...dt.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))];
      this.tempModel = [...this.dateRange1];
      const [first, second] = this.tempModel;
      if (type === "first") {
        this.pickerDate1 = first;
        const m = this.$moment(second);
        if (!m.isAfter(first, "month")) {
          this.pickerDate2 = m.add(1, "months").format("YYYY-MM-DD");
        } else {
          this.pickerDate2 = second;
        }
      } else {
        this.pickerDate2 = second;
        const m = this.$moment(first);
        if (!m.isBefore(second, "month")) {
          this.pickerDate1 = m.subtract(1, "months").format("YYYY-MM-DD");
        } else {
          this.pickerDate1 = first;
        }
      }
    },
    handleTemplate: function (type) {
      switch (type) {
        case "today":
          this.updateModel(this._today);
          return;
        case "yesterday":
          this.updateModel(this._yesterday);
          return;
        case "7days":
          this.updateModel(this._7days);
          return;
        case "30days":
          this.updateModel(this._30days);
          return;
        case "month":
          this.updateModel(this._month);
          return;
        default:
          return;
      }
    },
    save: function () {
      this.localModel = this.tempModel;
      this.dateRangeShown = false;
    }
  }
};
</script>
