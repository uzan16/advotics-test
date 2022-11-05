<template>
  <div class="d-flex wrapper mb-2" :class="{ hightlight: index === 0 }">
    <v-img
      :width="index === 0 ? 80 : 60"
      :height="index === 0 ? 80 : 60"
      :max-width="index === 0 ? 80 : 60"
      :max-height="index === 0 ? 80 : 60"
      :src="item.src"
      :lazy-src="require(`@/assets/images/loading.png`)"
    />
    <div class="d-flex flex-column flex-grow-1 px-3 py-1">
      <span
        class="font-weight-bold"
        :class="index === 0 ? 'text-subtitle-1' : 'text-subtitle-2'"
      >
        {{ item.name }}
      </span>
      <div class="d-flex flex-row align-center">
        <span
          class="grey--text text--darken-1 flex-grow-1"
          :class="index === 0 ? 'text-body-1' : 'text-body-2'"
        >
          {{ $helper.formatNumber(item.price, 0, "Rp") }}
        </span>
        <span
          class="grey--text text--darken-1"
          :class="index === 0 ? 'text-body-1' : 'text-body-2'"
        >
          {{ $helper.formatNumber(item.count, 0) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SkuItem",
  props: {
    item: {
      default: () => ({})
    },
    index: {
      default: 0
    }
  }
};
</script>
<style scoped>
.wrapper {
  border: 0.5px solid #c5c5c59c;
  border-radius: 4px;
  overflow: hidden;
}
.hightlight {
  background-color: #ffe7bd;
}
</style>
