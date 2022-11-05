<template>
  <div class="full-width">
    <item v-for="(item, i) in data" :key="i" :item="item" :index="i" />
  </div>
</template>
<script>
import Item from "@/components/atom/sku-item";
export default {
  name: "DashboardSkuList",
  components: {
    Item
  },
  props: {
    data: {
      default: () => []
    }
  },
  computed: {},
  methods: {}
};
</script>
<style></style>
